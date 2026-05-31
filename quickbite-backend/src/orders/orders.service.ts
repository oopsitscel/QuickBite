import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { OrderStatus, Role } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { AssignChefDto } from './dto/assign-chef.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderResponseDto } from "./dto/order-response.dto";

import { plainToInstance } from 'class-transformer';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
  ) {}

  private toOrderResponse(order: any): OrderResponseDto {
    return plainToInstance(OrderResponseDto, {
      id: order.id,
      status: order.status,
      totalPrice: order.totalPrice,
      createdAt: order.createdAt,
      customer: {
        id: order.customer.id,
        name: order.customer.name,
        email: order.customer.email,
      },
      chef: order.chef 
        ? {
          id: order.chef.id,
          name: order.chef.name,
          email: order.chef.email,
        }
        : undefined,
      items: order.details.map((d) => ({
        menuId: d.menuId,
        name: d.menu.name,
        quantity: d.quantity,
        price: d.price,
        subtotal: d.quantity * d.price,
      })),
    });
  }

  async create(dto: CreateOrderDto) {
    // Customer Existence Validation & Role Check
    const customer = await this.prisma.user.findUnique({
      where: { id: dto.customerId},
    });
    if (!customer) throw new NotFoundException(`Customer with id ${dto.customerId} not found`);
    if (customer.role !== Role.CUSTOMER) throw new BadRequestException('Only customer can create orders');

    let totalPrice = 0;
    const orderDetails: {
      menuId: string;
      quantity: number;
      price: number;
    }[] = [];
    
    // Menu Existence, Availability, and Stock Validation
    for (const item of dto.items) {
      const menu = await this.prisma.menu.findUnique({
        where: { id: item.menuId},
        select: {
          id: true,
          name: true,
          price: true,
          stock: true,
          isAvailable: true,
        }
      });
      if (!menu) throw new NotFoundException(`Menu with ID ${item.menuId} not found`);

      if (!menu.isAvailable) throw new BadRequestException(`${menu.name} is unavailable`);
      if (menu.stock <= 0) throw new BadRequestException(`${menu.name} is out of stock`);
      if (menu.stock < item.quantity) throw new BadRequestException(`Only ${menu.stock} stock available for ${menu.name}`);

      totalPrice += menu.price * item.quantity;

      orderDetails.push({
        menuId: menu.id,
        quantity: item.quantity,
        price: menu.price,
      });
    }

    // Create Order with Details in a Transaction
    const order = await this.prisma.order.create({
      data: {
        customerId: dto.customerId,
        totalPrice,
        status: OrderStatus.PENDING,
        details: {
          create: orderDetails,
        },
      },
      include: {
        customer: {
          select: { id: true, name: true, email: true },
        },
        chef: {
          select: { id: true, name: true, email: true },
        },
        details: {
          include: {
            menu: {
              select: { id: true, name: true, price: true },
            },
          },
        },
      },
    });

    // Reduce stock for each menu item
    for (const item of dto.items) {
      await this.prisma.menu.update({
        where: { id: item.menuId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return this.toOrderResponse(order);
  }

  async findAll(user: any) {
    let orders;
    // Admin can see all orders
    if (user.role === Role.ADMIN) {
      orders = await this.prisma.order.findMany({
        include: {
          customer: {
            select: { id: true, name: true, email: true },
          },
          chef: {
            select: { id: true, name: true, email: true },
          },
          details: {
            include: {
              menu: {
                select: { id: true, name: true, price: true },
              },
            },
          },
        },

        orderBy: { createdAt: 'desc' },
      });
    }

    // Customers can only see their own orders 
    if (user.role === Role.CUSTOMER) {
      orders = await this.prisma.order.findMany({
        where: { customerId: user.id },
        include: {
          customer: {
            select: { id: true, name: true, email: true },
          },
          chef: {
            select: { id: true, name: true, email: true },
          },
          details: {
            include: {
              menu: {
                select: { id: true, name: true, price: true },
              },
            },
          },
        },

        orderBy: { createdAt: 'desc' },
      });
    }
    
    // Chefs can only see orders assigned to them
    if (user.role === Role.CHEF) {
      orders = await this.prisma.order.findMany({
        where: { chefId: user.id },
        include: {
          customer: {
            select: { id: true, name: true, email: true },
          },
          chef: {
            select: { id: true, name: true, email: true },
          },
          details: {
            include: {
              menu: {
                select: { id: true, name: true, price: true },
              },
            },
          },
        },

        orderBy: { createdAt: 'desc' },
      });
    }


    if(orders) return orders.map((o) => this.toOrderResponse(o));
    else throw new BadRequestException('Invalid Role. Unable to fetch orders');
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        customer: {
          select: { id: true, name: true, email: true },
        },
        chef: {
          select: { id: true, name: true, email: true },
        },
        details: {
          include: {
            menu: {
              select: { id: true, name: true, price: true },
            },
          },
        },
      },
    });

    if (!order) throw new NotFoundException(`Order with ${id} not found`);
    return this.toOrderResponse(order);
  }

  async assignChef(orderId: string, dto: AssignChefDto) {
    const { chefId } = dto;

    // Order Existence Validation
    const order = await this.prisma.order.findUnique({
      where: { id: orderId},
    });
    if (!order) throw new NotFoundException(`Order with ${orderId} not found`);
    if (order.chefId) throw new BadRequestException(`Order with ID ${orderId} is already assigned`);
    if (order.status !== OrderStatus.PENDING) throw new BadRequestException('Chef can only be assigned to pending orders');
    
    // Chef Existence Validation & Role Check
    const chef = await this.prisma.user.findUnique({
      where: { id: chefId},
    });
    if (!chef) throw new NotFoundException(`Chef with ${chefId} not found`);

    if (chef.role !== Role.CHEF) throw new BadRequestException('Selected user is not a chef');
    
    const updated = this.prisma.order.update({
      where: { id: orderId },
      data: { chefId },
      include: {
        customer: {
          select: { id: true, name: true, email: true },
        },
        chef: {
          select: { id: true, name: true, email: true },
        },
        details: {
          include: {
            menu: {
              select: { id: true, name: true, price: true },
            },
          },
        },
      },
    });

    return this.toOrderResponse(updated);
  }

  async updateStatus(orderId: string, dto: UpdateOrderStatusDto) {
    const { status } = dto;

    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) throw new NotFoundException(`Order with ID ${orderId} not found`);
    if (!order.chefId) throw new BadRequestException(`Order with ID ${orderId} has no assigned chef`);
    
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      PENDING : [OrderStatus.COOKING],
      COOKING : [OrderStatus.READY],
      READY : [OrderStatus.COMPLETED],
      COMPLETED : [],
    };
    
    const allowed = validTransitions[order.status];
    if (!allowed.includes(status)) throw new BadRequestException(`Invalid status transition from ${order.status} to ${status}`);
    
    const updated = await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: {
        customer: {
          select: { id: true, name: true, email: true },
        },
        chef: {
          select: { id: true, name: true, email: true },
        },
        details: {
          include: {
            menu: {
              select: { id: true, name: true, price: true },
            },
          },
        },
      },
    });
    return this.toOrderResponse(updated);
  }
}