import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('menu')
export class MenusController {
  constructor(
    private readonly menusService: MenusService,
  ) {}

  @Post() // Admin and Chef can create menu items
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles('ADMIN', 'CHEF')
  create(@Body() dto: CreateMenuDto) {
    return this.menusService.create(dto);
  }

  @Get()
  findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(id);
  }

  @Patch(':id') // Admin and Chef can update menu items
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles('ADMIN', 'CHEF') 
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMenuDto,
  ) {
    return this.menusService.update(id, dto);
  }

  @Patch(':id/availability') // Only admin and chef can update menu availability
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles('ADMIN', 'CHEF')
  updateAvailability(@Param('id') id: string) {
    return this.menusService.updateAvailability(id);
  }
}
