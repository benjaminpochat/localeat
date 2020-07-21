import { DeliveryAddress } from './delivery-address.model';
import { Product } from './product.model';

export class Delivery {
  deliveryAddress: DeliveryAddress;
  deliveryDate: Date;
  availableProducts: Product[];
}
