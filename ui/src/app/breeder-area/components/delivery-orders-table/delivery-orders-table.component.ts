import { Component, Input, OnInit } from '@angular/core';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { Order } from 'src/app/commons/models/order.model';
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-delivery-orders-table',
  templateUrl: './delivery-orders-table.component.html',
  styleUrls: ['./delivery-orders-table.component.css']
})
export class DeliveryOrdersTableComponent implements OnInit {

  @Input()
  delivery: Delivery;
  orders: Order[];

  constructor(
    private deliveryService: DeliveryService
  ) { }

  ngOnInit(): void {
    this.deliveryService.getDeliveryOrders(this.delivery).subscribe(orders => this.orders = orders);
  }
}
