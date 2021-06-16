import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/commons/models/order.model';
import { OrderService } from 'src/app/customer-area/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private messageInfo: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  getOrderTotalPrice(){
    return this.orderService.getTotalPrice(this.order);
  }

  downloadCalendarFile() {
    this.messageInfo.open(
      'Désolé, cette fonctionnalité n\'est pas encore disponible',
      'X',
      {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
      });
  }
}
