import { ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Authentication } from 'src/app/commons/models/authentication.model';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { Farm } from 'src/app/commons/models/farm.model';
import { OrderStatus } from 'src/app/commons/models/order-status.model';
import { Order } from 'src/app/commons/models/order.model';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { DeliveryService } from 'src/app/customer-area/services/delivery.service';
import { OrderService } from 'src/app/customer-area/services/order.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { SlideshowComponent } from '../slideshow/slideshow.component';

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
  deliveryListTitle: string;
  slideshowShown = false;

  @ViewChild(OrderDialogComponent)
  private orderComponent: OrderDialogComponent;

  @ViewChild(SlideshowComponent)
  private slideshowComponent: SlideshowComponent;

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
    refreshDeliveriesEvent.subscribe(deliveries => {
        this.deliveries = deliveries;
        if (this.deliveries.length > 0) {
          this.deliveryListTitle = 'Les prochaines livraisons';
        } else {
          this.deliveryListTitle = 'Aucune livraison n\'est planifiée prochainement.';
        }

    });
    this.deliveryService.getDeliveries(refreshDeliveriesEvent);
  }

  private refreshOrders() {
    const refreshOrdersEvent = new EventEmitter<Order[]>();
    refreshOrdersEvent.subscribe((orders: [Order]) => {
      this.orders = orders.filter((order: Order) => [OrderStatus.BOOKED, OrderStatus.PAYED].includes(order.status));
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

  showSlideshow(farm: Farm){
    this.slideshowComponent.farm = farm;
  }
}
