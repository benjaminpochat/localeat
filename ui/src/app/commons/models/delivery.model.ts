import { DeliveryAddress } from './delivery-address.model';
import { Order } from './order.model';
import { Product } from './product.model';

export class Delivery {
  id: number;
  deliveryAddress: DeliveryAddress;
  deliveryStart: Date;
  deliveryEnd: Date;
  availableProducts: Product[];
  orders: Order[];
}
