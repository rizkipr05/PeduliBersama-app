import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import type { DisasterStatus } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';
import {
  CreateBencanaDto,
  DisasterNeedInput,
  DisasterPhotoInput,
} from './dto/create-bencana.dto';
import { UpdateBencanaDto } from './dto/update-bencana.dto';
import { FindOneBencanaDto } from './dto/find-one-bencana.dto';
import { UploadBencanaPhotoDto } from './dto/upload-bencana-photo.dto';
import { SetBencanaNeedsDto } from './dto/set-bencana-needs.dto';
import { TokenDto } from '../auth/dto/token.dto';

@Injectable()
export class BencanaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async create(createBencanaDto: CreateBencanaDto) {
    this.assertAdminToken(createBencanaDto.token);

    const title = createBencanaDto.title?.trim();
    if (!title) {
      throw new BadRequestException('Title is required');
    }

    const disaster = await this.prisma.disaster.create({
      data: {
        title,
        description: createBencanaDto.description?.trim(),
        location: createBencanaDto.location?.trim(),
        status: createBencanaDto.status ?? 'ACTIVE',
        photos: this.buildPhotoCreateMany(createBencanaDto.photos),
        needs: this.buildNeedCreateMany(createBencanaDto.needs),
      },
      include: {
        photos: true,
        needs: true,
      },
    });

    return {
      status: 'success',
      message: 'Disaster created successfully',
      data: disaster,
    };
  }

  async findAll(tokenDto: TokenDto) {
    this.assertAdminToken(tokenDto.token);

    const disasters = await this.prisma.disaster.findMany({
      include: {
        photos: true,
        needs: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return {
      status: 'success',
      message: 'Disasters fetched successfully',
      data: disasters,
    };
  }

  async findOne(findOneBencanaDto: FindOneBencanaDto) {
    this.assertAdminToken(findOneBencanaDto.token);
    const disaster = await this.getDisasterById(findOneBencanaDto.id);

    return {
      status: 'success',
      message: 'Disaster fetched successfully',
      data: disaster,
    };
  }

  async update(id: number, updateBencanaDto: UpdateBencanaDto) {
    this.assertAdminToken(updateBencanaDto.token);
    await this.getDisasterById(id);

    const data: {
      title?: string;
      description?: string | null;
      location?: string | null;
      status?: DisasterStatus;
      photos?: {
        deleteMany: Record<string, never>;
        createMany?: { data: DisasterPhotoInput[] };
      };
      needs?: {
        deleteMany: Record<string, never>;
        createMany?: { data: DisasterNeedInput[] };
      };
    } = {};

    if (updateBencanaDto.title !== undefined) {
      const title = updateBencanaDto.title?.trim();
      if (!title) {
        throw new BadRequestException('Title cannot be empty');
      }
      data.title = title;
    }

    if (updateBencanaDto.description !== undefined) {
      data.description = updateBencanaDto.description?.trim() || null;
    }

    if (updateBencanaDto.location !== undefined) {
      data.location = updateBencanaDto.location?.trim() || null;
    }

    if (updateBencanaDto.status) {
      data.status = updateBencanaDto.status;
    }

    if (updateBencanaDto.photos) {
      data.photos = {
        deleteMany: {},
        ...(updateBencanaDto.photos.length > 0
          ? {
              createMany: {
                data: this.normalizePhotos(updateBencanaDto.photos),
              },
            }
          : {}),
      };
    }

    if (updateBencanaDto.needs) {
      data.needs = {
        deleteMany: {},
        ...(updateBencanaDto.needs.length > 0
          ? {
              createMany: { data: this.normalizeNeeds(updateBencanaDto.needs) },
            }
          : {}),
      };
    }

    const disaster = await this.prisma.disaster.update({
      where: { id },
      data,
      include: {
        photos: true,
        needs: true,
      },
    });

    return {
      status: 'success',
      message: 'Disaster updated successfully',
      data: disaster,
    };
  }

  async remove(id: number, findOneBencanaDto: FindOneBencanaDto) {
    this.assertAdminToken(findOneBencanaDto.token);
    const disaster = await this.getDisasterById(id);

    await this.prisma.disaster.delete({
      where: { id },
    });

    return {
      status: 'success',
      message: 'Disaster deleted successfully',
      data: disaster,
    };
  }

  async uploadPhoto(uploadBencanaPhotoDto: UploadBencanaPhotoDto) {
    this.assertAdminToken(uploadBencanaPhotoDto.token);
    const disasterId = uploadBencanaPhotoDto.disasterId;
    const photoUrl = uploadBencanaPhotoDto.photoUrl?.trim();

    await this.getDisasterById(disasterId);

    if (!photoUrl) {
      throw new BadRequestException('Photo URL is required');
    }

    const photo = await this.prisma.disasterPhoto.create({
      data: {
        disasterId: disasterId!,
        photoUrl,
        caption: uploadBencanaPhotoDto.caption?.trim(),
      },
    });

    return {
      status: 'success',
      message: 'Disaster photo uploaded successfully',
      data: photo,
    };
  }

  async setNeeds(setBencanaNeedsDto: SetBencanaNeedsDto) {
    this.assertAdminToken(setBencanaNeedsDto.token);
    const disasterId = setBencanaNeedsDto.disasterId;
    await this.getDisasterById(disasterId);

    const normalizedNeeds = this.normalizeNeeds(setBencanaNeedsDto.needs);

    await this.prisma.disasterNeed.deleteMany({
      where: { disasterId: disasterId! },
    });

    if (normalizedNeeds.length > 0) {
      await this.prisma.disasterNeed.createMany({
        data: normalizedNeeds.map((need) => ({
          disasterId: disasterId!,
          ...need,
        })),
      });
    }

    const disaster = await this.prisma.disaster.findUnique({
      where: { id: disasterId! },
      include: {
        photos: true,
        needs: true,
      },
    });

    return {
      status: 'success',
      message: 'Disaster needs updated successfully',
      data: disaster,
    };
  }

  private assertAdminToken(token?: string) {
    const response = this.authService.validateToken({ token });
    const payload = response.data as { role: Role };

    if (payload.role !== Role.ADMIN) {
      throw new UnauthorizedException('Admin access required');
    }

    return payload;
  }

  private async getDisasterById(id?: number) {
    if (!id) {
      throw new BadRequestException('Disaster id is required');
    }

    const disaster = await this.prisma.disaster.findUnique({
      where: { id },
      include: {
        photos: true,
        needs: true,
      },
    });

    if (!disaster) {
      throw new NotFoundException('Disaster not found');
    }

    return disaster;
  }

  private buildPhotoCreateMany(photos?: DisasterPhotoInput[]) {
    const normalizedPhotos = this.normalizePhotos(photos);

    return normalizedPhotos.length > 0
      ? {
          createMany: {
            data: normalizedPhotos,
          },
        }
      : undefined;
  }

  private buildNeedCreateMany(needs?: DisasterNeedInput[]) {
    const normalizedNeeds = this.normalizeNeeds(needs);

    return normalizedNeeds.length > 0
      ? {
          createMany: {
            data: normalizedNeeds,
          },
        }
      : undefined;
  }

  private normalizePhotos(photos?: DisasterPhotoInput[]) {
    return (photos ?? [])
      .filter((photo) => photo.photoUrl?.trim())
      .map((photo) => ({
        photoUrl: photo.photoUrl.trim(),
        caption: photo.caption?.trim() || undefined,
      }));
  }

  private normalizeNeeds(needs?: DisasterNeedInput[]) {
    return (needs ?? [])
      .filter((need) => need.itemName?.trim())
      .map((need) => ({
        itemName: need.itemName.trim(),
        quantity: need.quantity,
        unit: need.unit?.trim() || undefined,
        notes: need.notes?.trim() || undefined,
      }));
  }
}
