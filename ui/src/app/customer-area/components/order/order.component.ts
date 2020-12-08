import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/commons/models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input()
  order: Order;

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
  }

  getOrderTotalPrice(){
    return this.orderService.getTotalPrice(this.order);
  }
}
