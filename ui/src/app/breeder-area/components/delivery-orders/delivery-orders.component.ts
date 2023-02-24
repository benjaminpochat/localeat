import { Component, OnInit } from '@angular/core';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { OrderStatus } from 'src/app/commons/models/order-status.model';
import { Order } from 'src/app/commons/models/order.model';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { DeliveryService } from 'src/app/breeder-area/services/delivery.service';

@Component({
  selector: 'app-delivery-orders',
  templateUrl: './delivery-orders.component.html',
  styleUrls: ['./delivery-orders.component.css']
})
export class DeliveryOrdersComponent implements OnInit {

  delivery: Delivery;

  constructor(
    private deliveryService: DeliveryService
  ) { }

  ngOnInit(): void {
  }

  initDelivery(slaughter: Slaughter) {
    this.delivery = slaughter.delivery;
  }

  setOrderPayed(order: Order){
    order.status = OrderStatus.PAYED;
    this.deliveryService.saveOrder(order).subscribe();
  }

  setOrderDelivered(order: Order){
    order.status = OrderStatus.DELIVERED;
    this.deliveryService.saveOrder(order).subscribe();
  }

  close() {
    this.delivery = undefined;
  }

  isOrderPayed(order: Order): boolean {
    return order.status === OrderStatus.PAYED;
  }

  isOrderBooked(order: Order): boolean {
    return order.status === OrderStatus.BOOKED;
  }

  getLabelOrderStatus(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.BOOKED:
        return "réservé"
      case OrderStatus.PAYED:
        return "payé"
      case OrderStatus.DELIVERED:
        return "livré"
      case OrderStatus.CANCELLED:
        return "annulé"
      case OrderStatus.SUBMITTED:
        return "soumis"
      default:
        throw "order.orderStatus unknown"
    }
  }

  getOrdersValidated(): Order[] {
    return this.delivery.orders.filter(order => order.status !== OrderStatus.CANCELLED && order.status !== OrderStatus.SUBMITTED)
  }
}
