import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { OrdersService } from './orders.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { AssignChefDto } from './dto/assign-chef.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post(':id/assign-chef')
  assignChef(@Param('id') orderId: string, @Body() dto: AssignChefDto) {
    return this.ordersService.assignChef(orderId, dto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') orderId: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(orderId, dto);
  }
}