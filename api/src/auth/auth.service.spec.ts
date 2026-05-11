import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  const prisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
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
    jest.resetAllMocks();
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

  it('creates a user from an admin token', async () => {
    const adminToken = (service as any).generateToken(
      1,
      'admin@mail.com',
      Role.ADMIN,
    );
    prisma.user.findUnique
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null);
    prisma.user.create.mockResolvedValue({
      id: 2,
      name: 'Donatur',
      email: 'donatur@mail.com',
      role: Role.USER,
    });

    const result = await service.createUser({
      token: adminToken,
      name: 'Donatur',
      email: 'donatur@mail.com',
      password: 'secret123',
      role: Role.USER,
    });

    expect(result.data).toMatchObject({
      id: 2,
      email: 'donatur@mail.com',
      role: Role.USER,
    });
  });

  it('lists users for an admin', async () => {
    const adminToken = (service as any).generateToken(
      1,
      'admin@mail.com',
      Role.ADMIN,
    );
    prisma.user.findMany.mockResolvedValue([
      { id: 1, name: 'Admin', email: 'admin@mail.com', role: Role.ADMIN },
      { id: 2, name: 'User', email: 'user@mail.com', role: Role.USER },
    ]);

    const result = await service.findAllUsers({ token: adminToken });

    expect(prisma.user.findMany).toHaveBeenCalled();
    expect(result.data).toHaveLength(2);
  });

  it('updates user role and password', async () => {
    const adminToken = (service as any).generateToken(
      1,
      'admin@mail.com',
      Role.ADMIN,
    );
    prisma.user.findUnique
      .mockResolvedValueOnce({
        id: 2,
        name: 'User',
        email: 'user@mail.com',
        password: 'hashed',
        role: Role.USER,
      })
      .mockResolvedValueOnce(null);
    prisma.user.update.mockImplementation(async ({ where, data }) => ({
      id: where.id,
      name: data.name ?? 'User',
      email: data.email ?? 'user@mail.com',
      role: data.role ?? Role.USER,
    }));

    const result = await service.updateUser(2, {
      id: 2,
      token: adminToken,
      name: 'Updated User',
      password: 'new-secret',
      role: Role.ADMIN,
    });

    expect(prisma.user.update).toHaveBeenCalled();
    expect(prisma.user.update.mock.calls[0][0].data.password).toBeDefined();
    expect(result.data.role).toBe(Role.ADMIN);
  });

  it('deletes another user for an admin', async () => {
    const adminToken = (service as any).generateToken(
      1,
      'admin@mail.com',
      Role.ADMIN,
    );
    prisma.user.findUnique.mockResolvedValue({
      id: 2,
      name: 'User',
      email: 'user@mail.com',
      password: 'hashed',
      role: Role.USER,
    });
    prisma.user.delete.mockResolvedValue({
      id: 2,
    });

    const result = await service.removeUser(2, { token: adminToken, id: 2 });

    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 2 } });
    expect(result.data.email).toBe('user@mail.com');
  });

  it('rejects deleting own admin account', async () => {
    const adminToken = (service as any).generateToken(
      1,
      'admin@mail.com',
      Role.ADMIN,
    );
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      name: 'Admin',
      email: 'admin@mail.com',
      password: 'hashed',
      role: Role.ADMIN,
    });

    await expect(
      service.removeUser(1, { token: adminToken, id: 1 }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects user management with non-admin token', async () => {
    const userToken = (service as any).generateToken(
      2,
      'user@mail.com',
      Role.USER,
    );

    await expect(
      service.findAllUsers({ token: userToken }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('throws not found when requested user does not exist', async () => {
    const adminToken = (service as any).generateToken(
      1,
      'admin@mail.com',
      Role.ADMIN,
    );
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(
      service.findOneUser({ token: adminToken, id: 999 }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
