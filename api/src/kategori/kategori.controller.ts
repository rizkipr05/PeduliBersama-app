import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KategoriService } from './kategori.service';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';

@Controller()
export class KategoriController {
  constructor(private readonly kategoriService: KategoriService) {}

  @MessagePattern('createKategori')
  create(@Payload() createKategoriDto: CreateKategoriDto) {
    return this.kategoriService.create(createKategoriDto);
  }

  @MessagePattern('findAllKategori')
  findAll() {
    return this.kategoriService.findAll();
  }

  @MessagePattern('findOneKategori')
  findOne(@Payload() id: number) {
    return this.kategoriService.findOne(id);
  }

  @MessagePattern('updateKategori')
  update(@Payload() updateKategoriDto: UpdateKategoriDto) {
    return this.kategoriService.update(updateKategoriDto.id, updateKategoriDto);
  }

  @MessagePattern('removeKategori')
  remove(@Payload() id: number) {
    return this.kategoriService.remove(id);
  }
}
