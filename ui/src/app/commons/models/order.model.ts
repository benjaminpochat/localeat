import { Customer } from './customer.model';
import { Delivery } from './delivery.model';
import { OrderItem } from './order-item.model';
import { OrderStatus } from './order-status.model';

export class Order {
  id: number;
  orderedItems: OrderItem[];
  customer: Customer;
  delivery: Delivery;
  totalPrice: number;
  totalNetWeight: number;
  status: OrderStatus;
}
