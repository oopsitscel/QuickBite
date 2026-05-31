import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CategoriesService } from './categories.service';

import { CreateCategoryDto } from './dto/create-category.dto';

import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post() // Only admin can create categories
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles('ADMIN')
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Get() // Public
  findAll() {
    return this.categoriesService.findAll();
  }
}