import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  register(registerDto: RegisterDto) {
    // TODO: Validasi data, hash password, dan simpan user ke database
    return {
      status: 'success',
      message: 'User registered successfully (Mock)',
      data: registerDto,
    };
  }

  login(loginDto: LoginDto) {
    // TODO: Cek email dan verify password, lalu generate JWT token
    return {
      status: 'success',
      message: 'User logged in successfully (Mock)',
      data: { email: loginDto.email, token: 'fake-jwt-token' },
    };
  }

  adminLogin(adminLoginDto: AdminLoginDto) {
    // TODO: Cek kredensial khusus admin, lalu generate JWT token khusus admin (CMS)
    return {
      status: 'success',
      message: 'Admin logged in successfully (Mock)',
      data: {
        email: adminLoginDto.email,
        token: 'fake-admin-jwt-token',
        role: 'admin',
      },
    };
  }
}
