import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { DeliveryService } from 'src/app/customer-area/services/delivery.service';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(
    public orderDialog: MatDialog
    ) { }

  ngOnInit(): void {

  }

  showOrderComponent(delivery: Delivery) {
    this.createOrderEvent.emit(delivery);
  }
}
