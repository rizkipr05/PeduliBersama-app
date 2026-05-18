import { Module } from '@nestjs/common';
import { DonasiService } from './donasi.service';
import { DonasiController } from './donasi.controller';
import { PrismaModule } from '../prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [DonasiController],
  providers: [DonasiService],
})
export class DonasiModule {}
