import { DataSource } from '@angular/cdk/table';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { Order } from 'src/app/commons/models/order.model';
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {

  deliveries: Delivery[];
  refreshDeliveriesEvent = new EventEmitter<Delivery[]>();

  constructor(
    private deliveryService: DeliveryService
  ) { }

  ngOnInit(): void {
    this.refreshDeliveries();
  }

  refreshDeliveries() {
    this.refreshDeliveriesEvent.subscribe((deliveries: Delivery[]) => {
      this.deliveries = deliveries;
      this.deliveries.forEach(delivery => this.loadDeliveryOrders(delivery));
    });
    this.deliveryService.getDeliveries(this.refreshDeliveriesEvent);
  }

  loadDeliveryOrders(delivery: Delivery): void {
    this.deliveryService.getDeliveryOrders(delivery).subscribe(orders => delivery.orders = orders);
  }

  getOrdersSummary(delivery: Delivery): string {
    const quantitySold = delivery.orders
      .reduce((soldWeightAccumulator, order) => soldWeightAccumulator + order.orderedItems[0].quantity, 0);
    return quantitySold + ' kg vendus';
  }
}
