import { Role } from '@prisma/client';

export class CreateAuthDto {
  token?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
}
