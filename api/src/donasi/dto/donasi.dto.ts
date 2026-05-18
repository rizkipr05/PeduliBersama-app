export class CreateDonasiDto {
  disasterId!: number;
  nominal!: number;
  paymentMethod!: string;
  donorName?: string;
  donorEmail?: string;
}

export class UpdateDonasiStatusDto {
  status!: 'VERIFIED' | 'REJECTED';
}

export class MidtransNotificationDto {
  order_id!: string;
  transaction_status!: string;
  fraud_status?: string;
  signature_key?: string;
  gross_amount?: string;
  status_code?: string;
  payment_type?: string;
}
