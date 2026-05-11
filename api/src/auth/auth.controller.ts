import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { TokenDto } from './dto/token.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  registerHttp(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @MessagePattern('register')
  register(@Payload() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('auth/login')
  loginHttp(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern('login')
  login(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('auth/admin/login')
  adminLoginHttp(@Body() adminLoginDto: AdminLoginDto) {
    return this.authService.adminLogin(adminLoginDto);
  }

  @MessagePattern('adminLogin')
  adminLogin(@Payload() adminLoginDto: AdminLoginDto) {
    return this.authService.adminLogin(adminLoginDto);
  }

  @Post('auth/logout')
  logoutHttp(
    @Body() tokenDto: TokenDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.authService.logout({
      token: tokenDto.token ?? this.extractBearerToken(authorization),
    });
  }

  @MessagePattern('logout')
  logout(@Payload() tokenDto: TokenDto) {
    return this.authService.logout(tokenDto);
  }

  @Post('auth/validate-token')
  validateTokenHttp(
    @Body() tokenDto: TokenDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.authService.validateToken({
      token: tokenDto.token ?? this.extractBearerToken(authorization),
    });
  }

  @MessagePattern('validateToken')
  validateToken(@Payload() tokenDto: TokenDto) {
    return this.authService.validateToken(tokenDto);
  }

  @Post('users')
  createUserHttp(
    @Body() createAuthDto: CreateAuthDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.authService.createUser({
      ...createAuthDto,
      token: createAuthDto.token ?? this.extractBearerToken(authorization),
    });
  }

  @MessagePattern('createUser')
  createUser(@Payload() createAuthDto: CreateAuthDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.authService.createUser(createAuthDto);
  }

  @Get('users')
  findAllUsersHttp(@Headers('authorization') authorization?: string) {
    return this.authService.findAllUsers({
      token: this.extractBearerToken(authorization),
    });
  }

  @MessagePattern('findAllUsers')
  findAllUsers(@Payload() tokenDto: TokenDto) {
    return this.authService.findAllUsers(tokenDto);
  }

  @Get('users/:id')
  findOneUserHttp(
    @Param('id') id: string,
    @Headers('authorization') authorization?: string,
  ) {
    return this.authService.findOneUser({
      id: Number(id),
      token: this.extractBearerToken(authorization),
    });
  }

  @MessagePattern('findOneUser')
  findOneUser(@Payload() findOneUserDto: FindOneUserDto) {
    return this.authService.findOneUser(findOneUserDto);
  }

  @Patch('users/:id')
  updateUserHttp(
    @Param('id') id: string,
    @Body() updateAuthDto: UpdateAuthDto,
    @Headers('authorization') authorization?: string,
  ) {
    const payload = {
      ...updateAuthDto,
      id: Number(id),
      token: updateAuthDto.token ?? this.extractBearerToken(authorization),
    };

    return this.authService.updateUser(payload.id, payload);
  }

  @MessagePattern('updateUser')
  updateUser(@Payload() updateAuthDto: UpdateAuthDto) {
    return this.authService.updateUser(updateAuthDto.id!, updateAuthDto);
  }

  @Delete('users/:id')
  removeUserHttp(
    @Param('id') id: string,
    @Headers('authorization') authorization?: string,
  ) {
    const payload = {
      id: Number(id),
      token: this.extractBearerToken(authorization),
    };

    return this.authService.removeUser(payload.id, payload);
  }

  @MessagePattern('removeUser')
  removeUser(@Payload() findOneUserDto: FindOneUserDto) {
    return this.authService.removeUser(findOneUserDto.id!, findOneUserDto);
  }

  private extractBearerToken(authorization?: string) {
    if (!authorization) {
      return undefined;
    }

    const [scheme, token] = authorization.split(' ');
    if (scheme?.toLowerCase() !== 'bearer') {
      return undefined;
    }

    return token;
  }
}
