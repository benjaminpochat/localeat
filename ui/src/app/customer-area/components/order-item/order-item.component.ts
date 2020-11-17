import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { OrderItem } from 'src/app/commons/models/order-item.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  @Input()
  orderItem: OrderItem;

  @Output()
  changeOrderItem = new EventEmitter<OrderItem>();

  constructor() { }

  ngOnInit(): void {
  }

  setQuantity(quantity: number){
    this.orderItem.quantity = quantity;
    this.changeOrderItem.emit(this.orderItem);
  }
}
