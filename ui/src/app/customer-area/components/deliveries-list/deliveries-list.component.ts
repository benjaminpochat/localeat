import { Component, OnInit, EventEmitter } from '@angular/core';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { DeliveryService } from 'src/app/customer-area/services/delivery.service';

@Component({
  selector: 'app-deliveries-list',
  templateUrl: './deliveries-list.component.html',
  styleUrls: ['./deliveries-list.component.css']
})
export class DeliveriesListComponent implements OnInit {

  deliveries: Delivery[];
  searchLoopBack = new EventEmitter<Delivery[]>();

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.refreshDeliveries();
  }

  refreshDeliveries() {
    this.searchLoopBack.subscribe((deliveries: Delivery[]) => this.deliveries = deliveries);
    this.deliveryService.getDeliveries(this.searchLoopBack);
  }

}
