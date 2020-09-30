import { Component, OnInit, EventEmitter } from '@angular/core';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { DeliveryService } from 'src/app/customer-area/services/delivery.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-deliveries-list',
  templateUrl: './deliveries-list.component.html',
  styleUrls: ['./deliveries-list.component.css']
})
export class DeliveriesListComponent implements OnInit {

  deliveries: Delivery[];
  searchLoopBack = new EventEmitter<Delivery[]>();

  constructor(
    private deliveryService: DeliveryService,
    public orderDialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.refreshDeliveries();
  }

  refreshDeliveries() {
    this.searchLoopBack.subscribe((deliveries: Delivery[]) => {
      this.deliveries = deliveries;
      this.deliveries.forEach(delivery => delivery.availableProducts.forEach(product => {
        if (product.description) {
          product.description = product.description.split('\n').join('\n<br>');
        }
      }));
    });
    this.deliveryService.getDeliveries(this.searchLoopBack);
  }

  openOrderDialog(delivery: Delivery) {
    this.orderDialog.open(OrderDialogComponent, {
      width: '90%',
      data: delivery
    });
  }

}
