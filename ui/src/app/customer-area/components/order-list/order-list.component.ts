import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/commons/models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[];
  orderListTitle: string;
  refreshOrdersEvent = new EventEmitter<Order[]>();

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.refreshCurrentOrders();
  }

  refreshCurrentOrders() {
    this.refreshOrdersEvent.subscribe((orders: Order[]) => {
      this.orders = orders;
      this.refreshOrderListTitle();
    });
    this.orderService.getCustomerCurrentOrders(this.refreshOrdersEvent);
  }

  getOrderTotalPrice(order: Order){
    return this.orderService.getTotalPrice(order);
  }

  refreshOrderListTitle(): void {
    if (this.orders.length > 0) {
      this.orderListTitle = 'Vos commandes en cours';
    } else {
      this.orderListTitle = 'Vous n\'avez pas de commandes en cours';
    }
  }

}
