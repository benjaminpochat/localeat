import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/commons/models/order.model';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { DeliveryService } from '../../services/delivery.service';
import { DeliveryCreationComponent } from '../delivery-creation/delivery-creation.component';
import { DeliveryOrdersComponent } from '../delivery-orders/delivery-orders.component';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  //TODO : déplacer les attributs de Order qui ne sont pas dans le code java, pour en faire des attributs ou des méthodes du composant

  @Input()
  slaughter: Slaughter;

  @ViewChild(DeliveryOrdersComponent)
  deliveryOrdersComponent: DeliveryOrdersComponent;

  netWeightSold: number;

  constructor(
    private deliveryService: DeliveryService
  ) { }

  ngOnInit(): void {
    if (this.slaughter.delivery.id){
      this.deliveryService.getDeliveryOrders(this.slaughter.delivery).subscribe(
        orders => {
          this.slaughter.delivery.orders = orders;
          this.slaughter.delivery.orders.forEach(order => {
            this.deliveryService.setOrderTotalNetWeight(order);
            this.deliveryService.setOrderTotalPrice(order);
          });
          const netWeightSoldCalculator = (accumulator: number, order: Order): number => accumulator + order.totalNetWeight;
          this.netWeightSold = this.slaughter.delivery.orders.reduce(netWeightSoldCalculator, 0);
        });
      }
  }

  showDeliveryOrders(): void {
    this.deliveryOrdersComponent.initDelivery(this.slaughter);
  }
}
