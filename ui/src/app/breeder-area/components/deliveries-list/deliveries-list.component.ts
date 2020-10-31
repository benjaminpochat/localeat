import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-deliveries-list',
  templateUrl: './deliveries-list.component.html',
  styleUrls: ['./deliveries-list.component.css']
})
export class DeliveriesListComponent implements OnInit {

  @Input()
  deliveries: Delivery[];
  refreshDeliveriesEvent = new EventEmitter<Delivery[]>();

  constructor(
    private deliveryService: DeliveryService
  ) { }

  ngOnInit(): void {
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
