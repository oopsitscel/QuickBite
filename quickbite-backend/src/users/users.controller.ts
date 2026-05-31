import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { UpdateRoleDto } from './dto/update-role.dto';


import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get() // Only admin can view all users
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles('ADMIN')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id') // Only admin can view a specific user
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles('ADMIN')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id/promote-chef') // Only admin can promote a chef
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles('ADMIN')
  updateRole(
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto,
  ) {
    return this.usersService.updateRole(
      id,
      dto.role,
    );
  }
}