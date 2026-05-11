import { PartialType } from '@nestjs/mapped-types';
import { CreateBencanaDto } from './create-bencana.dto';

export class UpdateBencanaDto extends PartialType(CreateBencanaDto) {
  id?: number;
}
