import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BencanaService } from './bencana.service';
import { CreateBencanaDto } from './dto/create-bencana.dto';
import { UpdateBencanaDto } from './dto/update-bencana.dto';
import { FindOneBencanaDto } from './dto/find-one-bencana.dto';
import { UploadBencanaPhotoDto } from './dto/upload-bencana-photo.dto';
import { SetBencanaNeedsDto } from './dto/set-bencana-needs.dto';
import { TokenDto } from '../auth/dto/token.dto';

@Controller()
export class BencanaController {
  constructor(private readonly bencanaService: BencanaService) {}

  @Post('bencana')
  createHttp(
    @Body() createBencanaDto: CreateBencanaDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.bencanaService.create({
      ...createBencanaDto,
      token: createBencanaDto.token ?? this.extractBearerToken(authorization),
    });
  }

  @MessagePattern('createBencana')
  create(@Payload() createBencanaDto: CreateBencanaDto) {
    return this.bencanaService.create(createBencanaDto);
  }

  @Get('bencana')
  findAllHttp(@Headers('authorization') authorization?: string) {
    return this.bencanaService.findAll({
      token: this.extractBearerToken(authorization),
    });
  }

  @MessagePattern('findAllBencana')
  findAll(@Payload() tokenDto: TokenDto) {
    return this.bencanaService.findAll(tokenDto);
  }

  @Get('bencana/:id')
  findOneHttp(
    @Param('id') id: string,
    @Headers('authorization') authorization?: string,
  ) {
    return this.bencanaService.findOne({
      id: Number(id),
      token: this.extractBearerToken(authorization),
    });
  }

  @MessagePattern('findOneBencana')
  findOne(@Payload() findOneBencanaDto: FindOneBencanaDto) {
    return this.bencanaService.findOne(findOneBencanaDto);
  }

  @Patch('bencana/:id')
  updateHttp(
    @Param('id') id: string,
    @Body() updateBencanaDto: UpdateBencanaDto,
    @Headers('authorization') authorization?: string,
  ) {
    const payload = {
      ...updateBencanaDto,
      id: Number(id),
      token: updateBencanaDto.token ?? this.extractBearerToken(authorization),
    };

    return this.bencanaService.update(payload.id, payload);
  }

  @MessagePattern('updateBencana')
  update(@Payload() updateBencanaDto: UpdateBencanaDto) {
    return this.bencanaService.update(updateBencanaDto.id!, updateBencanaDto);
  }

  @Delete('bencana/:id')
  removeHttp(
    @Param('id') id: string,
    @Headers('authorization') authorization?: string,
  ) {
    const payload = {
      id: Number(id),
      token: this.extractBearerToken(authorization),
    };

    return this.bencanaService.remove(payload.id, payload);
  }

  @MessagePattern('removeBencana')
  remove(@Payload() findOneBencanaDto: FindOneBencanaDto) {
    return this.bencanaService.remove(findOneBencanaDto.id!, findOneBencanaDto);
  }

  @Post('bencana/:id/photos')
  uploadPhotoHttp(
    @Param('id') id: string,
    @Body() uploadBencanaPhotoDto: UploadBencanaPhotoDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.bencanaService.uploadPhoto({
      ...uploadBencanaPhotoDto,
      disasterId: Number(id),
      token:
        uploadBencanaPhotoDto.token ?? this.extractBearerToken(authorization),
    });
  }

  @MessagePattern('uploadBencanaPhoto')
  uploadPhoto(@Payload() uploadBencanaPhotoDto: UploadBencanaPhotoDto) {
    return this.bencanaService.uploadPhoto(uploadBencanaPhotoDto);
  }

  @Put('bencana/:id/needs')
  setNeedsHttp(
    @Param('id') id: string,
    @Body() setBencanaNeedsDto: SetBencanaNeedsDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.bencanaService.setNeeds({
      ...setBencanaNeedsDto,
      disasterId: Number(id),
      token: setBencanaNeedsDto.token ?? this.extractBearerToken(authorization),
    });
  }

  @MessagePattern('setBencanaNeeds')
  setNeeds(@Payload() setBencanaNeedsDto: SetBencanaNeedsDto) {
    return this.bencanaService.setNeeds(setBencanaNeedsDto);
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
