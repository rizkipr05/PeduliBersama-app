import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  const prisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('registers a new user with a hashed password', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockImplementation(async ({ data }) => ({
      id: 1,
      ...data,
      role: Role.USER,
    }));

    const result = await service.register({
      name: 'Rizky',
      email: 'RIZKY@mail.com',
      password: 'secret123',
    });

    expect(prisma.user.create).toHaveBeenCalled();
    expect(prisma.user.create.mock.calls[0][0].data.password).not.toBe(
      'secret123',
    );
    expect(result.data).toMatchObject({
      id: 1,
      email: 'rizky@mail.com',
      role: Role.USER,
    });
  });

  it('rejects duplicate registration email', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 1 });

    await expect(
      service.register({
        email: 'user@mail.com',
        password: 'secret123',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('returns a JWT on successful login', async () => {
    const hashedPassword = (service as any).hashPassword('secret123');
    prisma.user.findUnique.mockResolvedValue({
      id: 10,
      name: 'Rizky',
      email: 'user@mail.com',
      password: hashedPassword,
      role: Role.USER,
    });

    const result = await service.login({
      email: 'user@mail.com',
      password: 'secret123',
    });

    expect(result.data.email).toBe('user@mail.com');
    expect(result.data.role).toBe(Role.USER);
    expect(result.data.accessToken.split('.')).toHaveLength(3);
  });

  it('rejects admin login for non-admin users', async () => {
    const hashedPassword = (service as any).hashPassword('secret123');
    prisma.user.findUnique.mockResolvedValue({
      id: 10,
      email: 'user@mail.com',
      password: hashedPassword,
      role: Role.USER,
    });

    await expect(
      service.adminLogin({
        email: 'user@mail.com',
        password: 'secret123',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('validates and revokes a token', async () => {
    const hashedPassword = (service as any).hashPassword('secret123');
    prisma.user.findUnique.mockResolvedValue({
      id: 10,
      name: 'Admin',
      email: 'admin@mail.com',
      password: hashedPassword,
      role: Role.ADMIN,
    });

    const loginResult = await service.login({
      email: 'admin@mail.com',
      password: 'secret123',
    });

    const token = loginResult.data.accessToken;
    const validationResult = service.validateToken({ token });
    expect(validationResult.data).toMatchObject({
      email: 'admin@mail.com',
      role: Role.ADMIN,
    });

    service.logout({ token });

    expect(() => service.validateToken({ token })).toThrow(
      UnauthorizedException,
    );
  });
});
