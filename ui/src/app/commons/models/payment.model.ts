import { Order } from './order.model';
import { PaymentStatus } from './payment-status.model';

export class Payment {
  id: number;
  order: Order;
  transactionId: string;
  amount: number;
  status: PaymentStatus;
  paymentUrl: string;
}
