import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DonasiService } from './donasi.service';
import {
  CreateDonasiDto,
  MidtransNotificationDto,
  UpdateDonasiStatusDto,
} from './dto/donasi.dto';

@Controller('donasi')
export class DonasiController {
  constructor(private readonly donasiService: DonasiService) {}

  private extractBearerToken(authorization?: string) {
    if (!authorization) return undefined;
    const [scheme, token] = authorization.split(' ');
    if (scheme?.toLowerCase() !== 'bearer') return undefined;
    return token;
  }

  /** Donatur: Buat donasi baru → returns payment_url & snap_token */
  @Post()
  create(
    @Body() createDonasiDto: CreateDonasiDto,
    @Headers('authorization') auth?: string,
  ) {
    return this.donasiService.createDonation(
      this.extractBearerToken(auth)!,
      createDonasiDto,
    );
  }

  /** Donatur: Lihat riwayat donasi saya */
  @Get('me')
  viewMyDonations(@Headers('authorization') auth?: string) {
    return this.donasiService.viewMyDonations(this.extractBearerToken(auth)!);
  }

  /** Public: Webhook dari Midtrans (server-to-server, no auth header needed) */
  @Post('midtrans-notification')
  midtransNotification(@Body() dto: MidtransNotificationDto) {
    return this.donasiService.handleMidtransNotification(dto);
  }

  /** Admin: Lihat semua donasi */
  @Get()
  listAllDonations(@Headers('authorization') auth?: string) {
    return this.donasiService.listAllDonations(this.extractBearerToken(auth)!);
  }

  /** Admin: Update status donasi secara manual */
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateDonasiStatusDto: UpdateDonasiStatusDto,
    @Headers('authorization') auth?: string,
  ) {
    return this.donasiService.updateStatus(
      this.extractBearerToken(auth)!,
      Number(id),
      updateDonasiStatusDto,
    );
  }
}
