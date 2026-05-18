import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KategoriModule } from './kategori/kategori.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma.module';
import { BencanaModule } from './bencana/bencana.module';
import { DonasiModule } from './donasi/donasi.module';

@Module({
  imports: [
    KategoriModule,
    AuthModule,
    PrismaModule,
    BencanaModule,
    DonasiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
