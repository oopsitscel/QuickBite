import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // User Existence Validation
    const userExist = await this.prisma.user.findUnique({
      where: { email: dto.email},
    });
    if (userExist) throw new BadRequestException('Email already exists');

    // Password Complexity Validation
    let hasUpper = false, hasLower = false, hasNumber = false, hasSpecial = false;
    const specials = `!@#$%^&*()_+-=[]{}|;':",./<>?~\``;

    for (const char of dto.password) {
      if (char >= 'A' && char <= 'Z') hasUpper = true;
      else if (char >= 'a' && char <= 'z') hasLower = true;
      else if (char >= '0' && char <= '9') hasNumber = true;
      else if (specials.includes(char)) hasSpecial = true;
    }

    if (!hasUpper) {
      throw new BadRequestException('Password must contain at least one uppercase letter.');
    }
    if (!hasLower) {
      throw new BadRequestException('Password must contain at least one lowercase letter.');
    }
    if (!hasNumber) {
      throw new BadRequestException('Password must contain at least one number (0-9).');
    }
    if (!hasSpecial) {
      throw new BadRequestException('Password must contain at least one special character.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: Role.CUSTOMER,
      },
    });

    return {
      message: 'Register success',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email},
    });
    if (!user) throw new UnauthorizedException('Invalid email');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid password');

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login success',
      access_token: access_token,
    };
  }
}