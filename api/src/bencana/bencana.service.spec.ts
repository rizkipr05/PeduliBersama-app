import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma.service';
import { BencanaService } from './bencana.service';

describe('BencanaService', () => {
  let service: BencanaService;

  const prisma = {
    disaster: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    disasterPhoto: {
      create: jest.fn(),
    },
    disasterNeed: {
      deleteMany: jest.fn(),
      createMany: jest.fn(),
    },
  };

  const authService = {
    validateToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BencanaService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    service = module.get<BencanaService>(BencanaService);
    jest.resetAllMocks();
    authService.validateToken.mockReturnValue({
      data: { sub: 1, role: Role.ADMIN },
    });
  });

  it('creates a disaster with photos and needs', async () => {
    prisma.disaster.create.mockResolvedValue({
      id: 1,
      title: 'Banjir',
      status: 'ACTIVE',
      photos: [{ id: 1, photoUrl: 'https://img.test/1.jpg' }],
      needs: [{ id: 1, itemName: 'Selimut' }],
    });

    const result = await service.create({
      token: 'admin-token',
      title: 'Banjir',
      status: 'ACTIVE',
      photos: [{ photoUrl: 'https://img.test/1.jpg' }],
      needs: [{ itemName: 'Selimut' }],
    });

    expect(prisma.disaster.create).toHaveBeenCalled();
    expect(result.data.title).toBe('Banjir');
  });

  it('lists disasters for an admin', async () => {
    prisma.disaster.findMany.mockResolvedValue([{ id: 1, title: 'Banjir' }]);

    const result = await service.findAll({ token: 'admin-token' });

    expect(prisma.disaster.findMany).toHaveBeenCalled();
    expect(result.data).toHaveLength(1);
  });

  it('updates a disaster status', async () => {
    prisma.disaster.findUnique.mockResolvedValueOnce({
      id: 1,
      title: 'Banjir',
      photos: [],
      needs: [],
    });
    prisma.disaster.update.mockResolvedValue({
      id: 1,
      title: 'Banjir',
      status: 'COMPLETED',
      photos: [],
      needs: [],
    });

    const result = await service.update(1, {
      id: 1,
      token: 'admin-token',
      status: 'COMPLETED',
    });

    expect(prisma.disaster.update).toHaveBeenCalled();
    expect(result.data.status).toBe('COMPLETED');
  });

  it('uploads a photo to an existing disaster', async () => {
    prisma.disaster.findUnique.mockResolvedValue({
      id: 1,
      title: 'Banjir',
      photos: [],
      needs: [],
    });
    prisma.disasterPhoto.create.mockResolvedValue({
      id: 3,
      disasterId: 1,
      photoUrl: 'https://img.test/3.jpg',
    });

    const result = await service.uploadPhoto({
      token: 'admin-token',
      disasterId: 1,
      photoUrl: 'https://img.test/3.jpg',
    });

    expect(prisma.disasterPhoto.create).toHaveBeenCalled();
    expect(result.data.photoUrl).toBe('https://img.test/3.jpg');
  });

  it('replaces disaster needs', async () => {
    prisma.disaster.findUnique
      .mockResolvedValueOnce({
        id: 1,
        title: 'Banjir',
        photos: [],
        needs: [],
      })
      .mockResolvedValueOnce({
        id: 1,
        title: 'Banjir',
        photos: [],
        needs: [{ id: 1, itemName: 'Makanan' }],
      });

    const result = await service.setNeeds({
      token: 'admin-token',
      disasterId: 1,
      needs: [{ itemName: 'Makanan', quantity: 20 }],
    });

    expect(prisma.disasterNeed.deleteMany).toHaveBeenCalledWith({
      where: { disasterId: 1 },
    });
    expect(prisma.disasterNeed.createMany).toHaveBeenCalled();
    expect(result.data.needs).toHaveLength(1);
  });

  it('deletes a disaster', async () => {
    prisma.disaster.findUnique.mockResolvedValue({
      id: 1,
      title: 'Banjir',
      photos: [],
      needs: [],
    });
    prisma.disaster.delete.mockResolvedValue({ id: 1 });

    const result = await service.remove(1, {
      token: 'admin-token',
      id: 1,
    });

    expect(prisma.disaster.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result.data.id).toBe(1);
  });

  it('rejects non-admin access', async () => {
    authService.validateToken.mockReturnValue({
      data: { sub: 2, role: Role.USER },
    });

    await expect(
      service.findAll({ token: 'user-token' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('throws when disaster is missing', async () => {
    prisma.disaster.findUnique.mockResolvedValue(null);

    await expect(
      service.findOne({ token: 'admin-token', id: 404 }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('throws when create title is missing', async () => {
    await expect(
      service.create({ token: 'admin-token', title: ' ' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
