import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { DeliveryService } from 'src/app/customer-area/services/delivery.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Order } from 'src/app/commons/models/order.model';
import { Product } from 'src/app/commons/models/product.model';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-deliveries-list',
  templateUrl: './deliveries-list.component.html',
  styleUrls: ['./deliveries-list.component.css']
})
export class DeliveriesListComponent implements OnInit {

  @Output()
  createOrderEvent = new EventEmitter<Order>();

  @ViewChild(OrderDialogComponent)
  private orderComponent: OrderDialogComponent;

  orderComponentShown = false;
  deliveries: Delivery[];
  refreshDeliveriesEvent = new EventEmitter<Delivery[]>();

  constructor(
    private deliveryService: DeliveryService,
    public orderDialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.refreshDeliveries();
  }

  refreshDeliveries() {
    this.refreshDeliveriesEvent.subscribe((deliveries: Delivery[]) => {
      this.deliveries = deliveries;
      this.deliveries.forEach(delivery => delivery.availableProducts.forEach(product => {
        if (product.description) {
          product.description = product.description.split('\n').join('\n<br>');
        }
      }));
    });
    this.deliveryService.getDeliveries(this.refreshDeliveriesEvent);
  }

  showOrderComponent(delivery: Delivery) {
    this.orderComponent.initOrder(delivery);
    this.orderComponent.createOrderEvent.subscribe((order: Order) => this.createOrderEvent.emit(order));
  }

  getUniqueProduct(delivery: Delivery): Product {
    return delivery.availableProducts[0];
  }
}
