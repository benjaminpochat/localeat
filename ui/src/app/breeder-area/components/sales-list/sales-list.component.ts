import { Component, OnInit, EventEmitter } from '@angular/core';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {

  deliveries: Delivery[];
  searchLoopBack = new EventEmitter<Delivery[]>();

  constructor(
    private deliveryService: DeliveryService
  ) { }

  ngOnInit(): void {
    this.refreshDeliveries();
  }
  refreshDeliveries() {
    this.searchLoopBack.subscribe((deliveries: Delivery[]) => this.deliveries = deliveries);
    this.deliveryService.getDeliveries(this.searchLoopBack);
  }

}
