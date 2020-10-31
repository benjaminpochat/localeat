import { ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Authentication } from 'src/app/commons/models/authentication.model';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { DeliveryService } from '../../services/delivery.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { OrderListComponent } from '../order-list/order-list.component';

@Component({
  selector: 'app-customer-area',
  templateUrl: './customer-area.component.html',
  styleUrls: ['./customer-area.component.css']
})
export class CustomerAreaComponent implements OnInit {
  router: any;
  authentication: Authentication;
  deliveries: Delivery[];

  @ViewChild(OrderDialogComponent)
  private orderComponent: OrderDialogComponent;

  @ViewChild(OrderListComponent)
  private orderList: OrderListComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private deliveryService: DeliveryService
  ) {}

  ngOnInit(): void {

    this.initAuthentication();
    this.initDeliveries();
  }

  private initAuthentication() {
    this.authenticationService.currentAuthentication.subscribe(authentication => {
      this.authentication = authentication;
    });
  }

  private initDeliveries() {
    const refreshDeliveriesEvent = new EventEmitter<Delivery[]>();
    refreshDeliveriesEvent.subscribe(deliveries => this.deliveries = deliveries);
    this.deliveryService.getDeliveries(refreshDeliveriesEvent);
  }

  openOrderDialog(delivery: Delivery){
    this.orderComponent.initOrder(delivery);
  }

  refreshOrderList() {
    this.orderList.refreshCurrentOrders();
  }
}
