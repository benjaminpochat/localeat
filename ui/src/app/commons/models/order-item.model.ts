import { Batch } from './batch.model';

export class OrderItem {
  id: number;
  quantity: number;
  batch: Batch;
  unitPrice: number;
}
