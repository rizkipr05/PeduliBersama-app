import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from 'crypto';
import { Role } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { PrismaService } from '../prisma.service';
import { TokenDto } from './dto/token.dto';

type AuthTokenPayload = {
  sub: number;
  email: string;
  role: Role;
  iat: number;
  exp: number;
};

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET ?? 'dev-secret-change-me';
  private readonly tokenTtlSeconds = 60 * 60;
  private readonly revokedTokens = new Map<string, number>();

  constructor(private prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    const name = registerDto.name?.trim();
    const email = registerDto.email?.trim().toLowerCase();
    const password = registerDto.password;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: this.hashPassword(password),
      },
    });

    return {
      status: 'success',
      message: 'User registered successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.authenticateUser(loginDto.email, loginDto.password);
    const accessToken = this.generateToken(user.id, user.email, user.role);

    return {
      status: 'success',
      message: 'User logged in successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken,
      },
    };
  }

  async adminLogin(adminLoginDto: AdminLoginDto) {
    const user = await this.authenticateUser(
      adminLoginDto.email,
      adminLoginDto.password,
    );

    if (user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Admin access required');
    }

    const accessToken = this.generateToken(user.id, user.email, user.role);

    return {
      status: 'success',
      message: 'Admin logged in successfully',
      data: {
        id: user.id,
        email: adminLoginDto.email,
        role: user.role,
        accessToken,
      },
    };
  }

  logout(tokenDto: TokenDto) {
    const payload = this.decodeAndVerifyToken(tokenDto.token);
    this.revokeToken(tokenDto.token!, payload.exp);

    return {
      status: 'success',
      message: 'User logged out successfully',
    };
  }

  validateToken(tokenDto: TokenDto) {
    const payload = this.decodeAndVerifyToken(tokenDto.token);

    return {
      status: 'success',
      message: 'Token is valid',
      data: payload,
    };
  }

  private async authenticateUser(email?: string, password?: string) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user || !this.verifyPassword(password, user.password)) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  private hashPassword(password: string) {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 100000, 32, 'sha256').toString(
      'hex',
    );

    return `${salt}:${hash}`;
  }

  private verifyPassword(password: string, storedPassword: string) {
    const [salt, storedHash] = storedPassword.split(':');
    if (!salt || !storedHash) {
      return false;
    }

    const calculatedHash = pbkdf2Sync(
      password,
      salt,
      100000,
      32,
      'sha256',
    ).toString('hex');

    return timingSafeEqual(
      Buffer.from(calculatedHash, 'hex'),
      Buffer.from(storedHash, 'hex'),
    );
  }

  private generateToken(sub: number, email: string, role: Role) {
    const now = Math.floor(Date.now() / 1000);
    const payload: AuthTokenPayload = {
      sub,
      email,
      role,
      iat: now,
      exp: now + this.tokenTtlSeconds,
    };

    const encodedHeader = this.base64UrlEncode(
      JSON.stringify({ alg: 'HS256', typ: 'JWT' }),
    );
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
    const signature = this.sign(`${encodedHeader}.${encodedPayload}`);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  private decodeAndVerifyToken(token?: string) {
    if (!token) {
      throw new BadRequestException('Token is required');
    }

    this.cleanupRevokedTokens();

    if (this.revokedTokens.has(token)) {
      throw new UnauthorizedException('Token has been revoked');
    }

    const [encodedHeader, encodedPayload, signature] = token.split('.');
    if (!encodedHeader || !encodedPayload || !signature) {
      throw new UnauthorizedException('Invalid token format');
    }

    const expectedSignature = this.sign(`${encodedHeader}.${encodedPayload}`);
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      throw new UnauthorizedException('Invalid token signature');
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf-8'),
    ) as AuthTokenPayload;

    if (payload.exp <= Math.floor(Date.now() / 1000)) {
      throw new UnauthorizedException('Token has expired');
    }

    return payload;
  }

  private sign(content: string) {
    return createHmac('sha256', this.jwtSecret)
      .update(content)
      .digest('base64url');
  }

  private base64UrlEncode(content: string) {
    return Buffer.from(content).toString('base64url');
  }

  private revokeToken(token: string, exp: number) {
    this.revokedTokens.set(token, exp);
    this.cleanupRevokedTokens();
  }

  private cleanupRevokedTokens() {
    const now = Math.floor(Date.now() / 1000);

    for (const [token, exp] of this.revokedTokens.entries()) {
      if (exp <= now) {
        this.revokedTokens.delete(token);
      }
    }
  }
}
