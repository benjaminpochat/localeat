import { ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Authentication } from 'src/app/commons/models/authentication.model';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { Order } from 'src/app/commons/models/order.model';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { DeliveryService } from '../../services/delivery.service';
import { OrderService } from '../../services/order.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';

@Component({
  selector: 'app-customer-area',
  templateUrl: './customer-area.component.html',
  styleUrls: ['./customer-area.component.css']
})
export class CustomerAreaComponent implements OnInit {
  router: any;
  authentication: Authentication;
  deliveries: Delivery[];
  orders: Order[];
  orderListTitle: string;

  @ViewChild(OrderDialogComponent)
  private orderComponent: OrderDialogComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private deliveryService: DeliveryService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.initAuthentication();
    this.refreshDeliveries();
    if (this.authentication) {
      this.refreshOrders();
    }
  }

  private initAuthentication() {
    this.authenticationService.currentAuthentication.subscribe(authentication => {
      this.authentication = authentication;
    });
  }

  private refreshDeliveries() {
    const refreshDeliveriesEvent = new EventEmitter<Delivery[]>();
    refreshDeliveriesEvent.subscribe(deliveries => this.deliveries = deliveries);
    this.deliveryService.getDeliveries(refreshDeliveriesEvent);
  }

  private refreshOrders() {
    const refreshOrdersEvent = new EventEmitter<Order[]>();
    refreshOrdersEvent.subscribe(orders => {
      this.orders = orders;
      if (this.orders.length > 0) {
        this.orderListTitle = 'Vos commandes en cours';
      } else {
        this.orderListTitle = 'Vous n\'avez pas de commandes en cours';
      }

    });
    this.orderService.getCustomerCurrentOrders(refreshOrdersEvent);
  }

  openOrderDialog(delivery: Delivery){
    this.orderComponent.initOrder(delivery);
  }

  refreshCustomerArea() {
    this.refreshDeliveries();
    this.refreshOrders();
  }
}
