import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Authentication } from 'src/app/commons/models/authentication.model';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { OrderListComponent } from '../order-list/order-list.component';

@Component({
  selector: 'app-customer-area',
  templateUrl: './customer-area.component.html',
  styleUrls: ['./customer-area.component.css']
})
export class CustomerAreaComponent implements OnInit {
  router: any;
  authentication: Authentication;

  @ViewChild(OrderListComponent)
  private orderList: OrderListComponent;

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authenticationService.currentAuthentication.subscribe(authentication => {
      this.authentication = authentication;
    });
  }

  refreshOrderList() {
    this.orderList.refreshCurrentOrders();
  }


}
