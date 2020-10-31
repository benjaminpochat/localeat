import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Batch } from 'src/app/commons/models/batch.model';
import { OrderItem } from 'src/app/commons/models/order-item.model';
import { Order } from 'src/app/commons/models/order.model';
import { ProductSelectorComponent } from '../product-selector/product-selector.component';

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
    debugger
    this.orderItem.quantity = quantity;
    this.changeOrderItem.emit(this.orderItem);
  }
}
