import { Module } from '@nestjs/common';
import { BencanaService } from './bencana.service';
import { BencanaController } from './bencana.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [BencanaController],
  providers: [BencanaService],
})
export class BencanaModule {}
