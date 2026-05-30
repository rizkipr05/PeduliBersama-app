import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from 'crypto';
import { Role } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { PrismaService } from '../prisma.service';
import { TokenDto } from './dto/token.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';

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

  async createUser(createAuthDto: CreateAuthDto) {
    this.assertAdminToken(createAuthDto.token);

    const name = createAuthDto.name?.trim();
    const email = createAuthDto.email?.trim().toLowerCase();
    const password = createAuthDto.password;
    const role = createAuthDto.role ?? Role.USER;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    await this.ensureEmailAvailable(email);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: this.hashPassword(password),
        role,
      },
    });

    return {
      status: 'success',
      message: 'User created successfully',
      data: this.sanitizeUser(user),
    };
  }

  async findAllUsers(tokenDto: TokenDto) {
    this.assertAdminToken(tokenDto.token);

    const users = await this.prisma.user.findMany({
      orderBy: { id: 'asc' },
    });

    return {
      status: 'success',
      message: 'Users fetched successfully',
      data: users.map((user) => this.sanitizeUser(user)),
    };
  }

  async findOneUser(findOneUserDto: FindOneUserDto) {
    this.assertAdminToken(findOneUserDto.token);

    const user = await this.getUserById(findOneUserDto.id);

    return {
      status: 'success',
      message: 'User fetched successfully',
      data: this.sanitizeUser(user),
    };
  }

  async updateUser(id: number, updateAuthDto: UpdateAuthDto) {
    this.assertAdminToken(updateAuthDto.token);
    await this.getUserById(id);

    const email = updateAuthDto.email?.trim().toLowerCase();
    if (email) {
      await this.ensureEmailAvailable(email, id);
    }

    const data = {
      ...(updateAuthDto.name !== undefined
        ? { name: updateAuthDto.name?.trim() || null }
        : {}),
      ...(email ? { email } : {}),
      ...(updateAuthDto.password
        ? { password: this.hashPassword(updateAuthDto.password) }
        : {}),
      ...(updateAuthDto.role ? { role: updateAuthDto.role } : {}),
    };

    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    return {
      status: 'success',
      message: 'User updated successfully',
      data: this.sanitizeUser(user),
    };
  }

  async removeUser(id: number, findOneUserDto: FindOneUserDto) {
    const admin = this.assertAdminToken(findOneUserDto.token);
    const user = await this.getUserById(id);

    if (admin.sub === id) {
      throw new BadRequestException('Admin cannot delete their own account');
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return {
      status: 'success',
      message: 'User deleted successfully',
      data: this.sanitizeUser(user),
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

  private async getUserById(id?: number) {
    if (!id) {
      throw new BadRequestException('User id is required');
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private async ensureEmailAvailable(email: string, ignoreUserId?: number) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.id !== ignoreUserId) {
      throw new ConflictException('Email is already registered');
    }
  }

  private sanitizeUser(user: {
    id: number;
    name: string | null;
    email: string;
    role: Role;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      ...(user.createdAt ? { createdAt: user.createdAt } : {}),
      ...(user.updatedAt ? { updatedAt: user.updatedAt } : {}),
    };
  }

  private assertAdminToken(token?: string) {
    const payload = this.decodeAndVerifyToken(token);

    if (payload.role !== Role.ADMIN) {
      throw new UnauthorizedException('Admin access required');
    }

    return payload;
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

    const normalizedToken = token.trim().replace(/^"(.*)"$/, '$1');

    this.cleanupRevokedTokens();

    if (this.revokedTokens.has(normalizedToken)) {
      throw new UnauthorizedException('Token has been revoked');
    }

    const [encodedHeader, encodedPayload, signature] = normalizedToken.split('.');
    if (!encodedHeader || !encodedPayload || !signature) {
      throw new UnauthorizedException('Invalid token format');
    }

    const expectedSignature = this.sign(`${encodedHeader}.${encodedPayload}`);
    if (signature.length !== expectedSignature.length) {
      throw new UnauthorizedException('Invalid token signature');
    }

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
    const normalizedToken = token.trim().replace(/^"(.*)"$/, '$1');
    this.revokedTokens.set(normalizedToken, exp);
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
