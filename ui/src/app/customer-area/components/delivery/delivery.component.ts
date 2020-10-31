import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { DeliveryService } from 'src/app/customer-area/services/delivery.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Order } from 'src/app/commons/models/order.model';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  @Input()
  delivery: Delivery;

  @Output()
  createOrderEvent = new EventEmitter<Delivery>();

  orderComponentShown = false;
  refreshDeliveriesEvent = new EventEmitter<Delivery[]>();

  constructor(
    private deliveryService: DeliveryService,
    public orderDialog: MatDialog
    ) { }

  ngOnInit(): void {

  }

  showOrderComponent(delivery: Delivery) {
    this.createOrderEvent.emit(delivery);
  }
}
