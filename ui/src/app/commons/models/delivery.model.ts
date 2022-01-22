import { Batch } from './batch.model';
import { DeliveryAddress } from './delivery-address.model';
import { Order } from './order.model';
import { PublicDeliveryAccessControl } from './public-delivery-access-control.model';
import { SharedDeliveryAccessKey } from './shared-delivery-access-key.model';
import { SharedKeyDeliveryAccessControl } from './shared-key-access-control.model';

export class Delivery {
  id: number;
  name: string;
  deliveryAddress: DeliveryAddress;
  deliveryStart: Date;
  deliveryEnd: Date;
  availableBatches: Batch[];
  orders: Order[];
  accessControl: PublicDeliveryAccessControl | SharedKeyDeliveryAccessControl;
}
