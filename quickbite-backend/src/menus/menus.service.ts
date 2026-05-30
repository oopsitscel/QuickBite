import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(dto: CreateMenuDto) {
    // Menu Existence Validation
    const existingMenu = await this.prisma.menu.findFirst({
      where: {name: dto.name},
    });
    if (existingMenu) throw new BadRequestException('Menu name already exists');

    // Category Existence Validation
    const category = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
    });
    if (!category) throw new BadRequestException('Category not found');

    return this.prisma.menu.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
        estimatedCookingTime: dto.estimatedCookingTime,
        imageUrl: dto.imageUrl,
        isAvailable: dto.isAvailable ?? true,
        categoryId: dto.categoryId,
      },
    });
  }

  async findAll() {
    return this.prisma.menu.findMany({
        include: { category: true },
        orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    // Menu Existence Validation
    const menu = await this.prisma.menu.findUnique({
      where: { id},
      include: { category: true},
    });
    if (!menu) throw new NotFoundException('Menu not found');

    return menu;
  }

  async update(id: string, dto: UpdateMenuDto) {
    // Menu Existence Validation
    const menu = await this.prisma.menu.findUnique({
      where: { id },
    });
    if (!menu) throw new NotFoundException('Menu not found');
    
    if (dto.name) {
      const existingMenu = await this.prisma.menu.findFirst({
        where: {
          name: dto.name,
          NOT: { id },
        },
      });
      if (existingMenu) throw new BadRequestException('Menu name already exists');
    }

    if (dto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: dto.categoryId},
      });
      if (!category) throw new BadRequestException('Category not found');
    }

    return this.prisma.menu.update({
      where: { id },data: dto,
    });
  }

  async remove(id: string) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
    });
    if (!menu) throw new NotFoundException('Menu not found');

    return this.prisma.menu.delete({
      where: { id },
    });
  }
}