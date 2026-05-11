import { DisasterNeedInput } from './create-bencana.dto';

export class SetBencanaNeedsDto {
  token?: string;
  disasterId?: number;
  needs?: DisasterNeedInput[];
}
