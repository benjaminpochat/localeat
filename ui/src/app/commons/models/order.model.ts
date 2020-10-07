import { Customer } from './customer.model';
import { Delivery } from './delivery.model';
import { OrderItem } from './order-item.model';

export class Order {
  id: number;
  orderedItems: OrderItem[];
  customer: Customer;
  delivery: Delivery;
}
