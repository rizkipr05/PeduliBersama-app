import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { createHash } from 'crypto';
import * as Midtrans from 'midtrans-client';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';
import { Role, DonationStatus } from '@prisma/client';
import {
  CreateDonasiDto,
  UpdateDonasiStatusDto,
  MidtransNotificationDto,
} from './dto/donasi.dto';

@Injectable()
export class DonasiService {
  private snap: Midtrans.Snap;

  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {
    this.snap = new Midtrans.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
      serverKey: process.env.MIDTRANS_SERVER_KEY ?? '',
      clientKey: process.env.MIDTRANS_CLIENT_KEY ?? '',
    });
  }

  private extractUser(token?: string) {
    if (!token) throw new UnauthorizedException('Token is required');
    const response = this.authService.validateToken({ token });
    return response.data as {
      sub: number;
      email: string;
      name?: string;
      role: Role;
    };
  }

  private assertAdmin(token?: string) {
    const user = this.extractUser(token);
    if (user.role !== Role.ADMIN)
      throw new UnauthorizedException('Admin access required');
    return user;
  }

  async createDonation(token: string, dto: CreateDonasiDto) {
    const user = this.extractUser(token);
    const disaster = await this.prisma.disaster.findUnique({
      where: { id: dto.disasterId },
    });
    if (!disaster) throw new NotFoundException('Disaster not found');

    if (!dto.nominal || dto.nominal < 1000) {
      throw new BadRequestException('Nominal donasi minimal Rp 1.000');
    }

    // Create donation record first to get order_id
    const donation = await this.prisma.donation.create({
      data: {
        userId: user.sub,
        disasterId: dto.disasterId,
        nominal: dto.nominal,
        paymentMethod: dto.paymentMethod,
        status: DonationStatus.PENDING,
      },
    });

    const orderId = `DONASI-${donation.id}-${Date.now()}`;

    const snapTransaction = {
      transaction_details: {
        order_id: orderId,
        gross_amount: Math.round(dto.nominal),
      },
      customer_details: {
        first_name: dto.donorName ?? user.name ?? user.email,
        email: dto.donorEmail ?? user.email,
      },
      item_details: [
        {
          id: `DISASTER-${disaster.id}`,
          price: Math.round(dto.nominal),
          quantity: 1,
          name: `Donasi untuk: ${disaster.title}`.substring(0, 50),
        },
      ],
    };

    let snapToken = '';
    let paymentUrl = '';

    try {
      type SnapResult = { token: string; redirect_url: string };
      type SnapWithCreate = {
        createTransaction: (
          params: Record<string, unknown>,
        ) => Promise<SnapResult>;
      };

      const snapResult = await (this.snap as unknown as SnapWithCreate).createTransaction(
        snapTransaction as unknown as Record<string, unknown>,
      );
      snapToken = snapResult.token;
      paymentUrl = snapResult.redirect_url;
    } catch (err: unknown) {
      await this.prisma.donation.delete({ where: { id: donation.id } });
      const message = err instanceof Error ? err.message : 'Midtrans error';
      throw new BadRequestException(`Gagal membuat transaksi: ${message}`);
    }

    const updatedDonation = await this.prisma.donation.update({
      where: { id: donation.id },
      data: { snapToken, paymentUrl },
      include: { disaster: true },
    });

    return {
      status: 'success',
      message: 'Donation created successfully',
      data: {
        ...updatedDonation,
        snap_token: snapToken,
        payment_url: paymentUrl,
      },
    };
  }

  async handleMidtransNotification(dto: MidtransNotificationDto) {
    const serverKey = process.env.MIDTRANS_SERVER_KEY ?? '';
    const orderId = dto.order_id;
    const statusCode = dto.status_code ?? '200';
    const grossAmount = dto.gross_amount ?? '0.00';

    const expectedSignature = createHash('sha512')
      .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
      .digest('hex');

    if (dto.signature_key && dto.signature_key !== expectedSignature) {
      throw new UnauthorizedException('Invalid Midtrans signature');
    }

    const parts = orderId.split('-');
    const donationId = parseInt(parts[1]);
    if (isNaN(donationId)) {
      throw new BadRequestException('Invalid order_id format');
    }

    const donation = await this.prisma.donation.findUnique({
      where: { id: donationId },
    });
    if (!donation) throw new NotFoundException('Donation not found');

    const transactionStatus = dto.transaction_status;
    const fraudStatus = dto.fraud_status;

    let newStatus: DonationStatus = DonationStatus.PENDING;

    if (transactionStatus === 'capture') {
      newStatus =
        fraudStatus === 'accept'
          ? DonationStatus.VERIFIED
          : DonationStatus.REJECTED;
    } else if (transactionStatus === 'settlement') {
      newStatus = DonationStatus.VERIFIED;
    } else if (
      ['cancel', 'deny', 'expire', 'failure'].includes(transactionStatus)
    ) {
      newStatus = DonationStatus.REJECTED;
    }

    const updated = await this.prisma.donation.update({
      where: { id: donationId },
      data: { status: newStatus },
    });

    return {
      status: 'success',
      message: 'Notification handled',
      data: updated,
    };
  }

  async viewMyDonations(token: string) {
    const user = this.extractUser(token);
    const donations = await this.prisma.donation.findMany({
      where: { userId: user.sub },
      include: { disaster: true },
      orderBy: { createdAt: 'desc' },
    });
    return {
      status: 'success',
      message: 'Donations fetched successfully',
      data: donations,
    };
  }

  async listAllDonations(token: string) {
    this.assertAdmin(token);
    const donations = await this.prisma.donation.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        disaster: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return {
      status: 'success',
      message: 'Donations fetched successfully',
      data: donations,
    };
  }

  async updateStatus(token: string, id: number, dto: UpdateDonasiStatusDto) {
    this.assertAdmin(token);
    const donation = await this.prisma.donation.findUnique({ where: { id } });
    if (!donation) throw new NotFoundException('Donation not found');

    const updated = await this.prisma.donation.update({
      where: { id },
      data: { status: dto.status },
      include: {
        user: { select: { id: true, name: true, email: true } },
        disaster: true,
      },
    });

    return {
      status: 'success',
      message: 'Donation status updated successfully',
      data: updated,
    };
  }
}
