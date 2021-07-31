import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderStatus, OrderStatusUtils } from 'src/app/commons/models/order-status.model';
import { Order } from 'src/app/commons/models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: Order;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.orderService.getOrder(routeParams.get('orderId')).subscribe(order => this.order = order);
  }

  getStatusLabel(): string {
    return OrderStatusUtils.getOrderStatusLabel(this.order.status);
  }

  isStatusValidated(): boolean {
    return (OrderStatus.PAYED === this.order.status) || (OrderStatus.DELIVERED === this.order.status);
  }

  isStatusBooked(): boolean {
    return (OrderStatus.BOOKED === this.order.status);
  }

  isStatusCancelled(): boolean {
    return OrderStatus.CANCELLED === this.order.status;
  }

  isStatusSubmitted(): boolean {
    return OrderStatus.SUBMITTED === this.order.status;
  }

  getTotalPrice(): number {
    return this.orderService.getTotalPrice(this.order);
  }

  getDeliveryAddressElements(): string[] {
    return [
      this.order.delivery.deliveryAddress.name,
      this.order.delivery.deliveryAddress.addressLine1,
      this.order.delivery.deliveryAddress.addressLine2,
      this.order.delivery.deliveryAddress.addressLine3,
      this.order.delivery.deliveryAddress.addressLine4,
      this.order.delivery.deliveryAddress.zipCode,
      this.order.delivery.deliveryAddress.city
    ].filter(addressElement => addressElement && (addressElement.length > 0));
  }

  goHome(): void {
    window.location.replace('./customer-area');
  }

  print(): void {
    window.print();
  }
}
