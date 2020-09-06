import { DeliveryAddress } from './delivery-address.model';
import { Product } from './product.model';

export class Delivery {
  deliveryAddress: DeliveryAddress;
  deliveryStart: Date;
  deliveryEnd: Date;
  availableProducts: Product[];
}
