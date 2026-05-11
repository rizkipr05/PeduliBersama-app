import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { TokenDto } from './dto/token.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('register')
  register(@Payload() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @MessagePattern('login')
  login(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern('adminLogin')
  adminLogin(@Payload() adminLoginDto: AdminLoginDto) {
    return this.authService.adminLogin(adminLoginDto);
  }

  @MessagePattern('logout')
  logout(@Payload() tokenDto: TokenDto) {
    return this.authService.logout(tokenDto);
  }

  @MessagePattern('validateToken')
  validateToken(@Payload() tokenDto: TokenDto) {
    return this.authService.validateToken(tokenDto);
  }
}
