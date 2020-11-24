import { Component, OnInit } from '@angular/core';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { Slaughter } from 'src/app/commons/models/slaughter.model';

@Component({
  selector: 'app-delivery-orders',
  templateUrl: './delivery-orders.component.html',
  styleUrls: ['./delivery-orders.component.css']
})
export class DeliveryOrdersComponent implements OnInit {

  delivery: Delivery;

  constructor() { }

  ngOnInit(): void {
  }

  initDelivery(slaughter: Slaughter) {
    this.delivery = slaughter.delivery;
  }

  close() {
    this.delivery = undefined;
  }
}
