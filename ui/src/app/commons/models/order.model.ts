import { Customer } from './customer.model';
import { Delivery } from './delivery.model';
import { OrderItem } from './order-item.model';
import { Product } from './product.model';

export class Order {
  orderedItems: OrderItem[];
  customer: Customer;
  delivery: Delivery;
}
