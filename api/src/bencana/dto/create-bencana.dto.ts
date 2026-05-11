import type { DisasterStatus } from '@prisma/client';

export type DisasterNeedInput = {
  itemName: string;
  quantity?: number;
  unit?: string;
  notes?: string;
};

export type DisasterPhotoInput = {
  photoUrl: string;
  caption?: string;
};

export class CreateBencanaDto {
  token?: string;
  title?: string;
  description?: string;
  location?: string;
  status?: DisasterStatus;
  photos?: DisasterPhotoInput[];
  needs?: DisasterNeedInput[];
}
