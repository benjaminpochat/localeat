import { Batch } from './batch.model';
import { DeliveryAddress } from './delivery-address.model';
import { Order } from './order.model';

export class Delivery {
  id: number;
  deliveryAddress: DeliveryAddress;
  deliveryStart: Date;
  deliveryEnd: Date;
  availableBatches: Batch[];
  orders: Order[];
}
