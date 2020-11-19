import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/commons/models/order.model';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-delivery-orders',
  templateUrl: './delivery-orders.component.html',
  styleUrls: ['./delivery-orders.component.css']
})
export class DeliveryOrdersComponent implements OnInit {

  //TODO : déplacer les attributs de Order qui ne sont pas dans le code java, pour en faire des attributs ou des méthodes du composant

  @Input()
  slaughter: Slaughter;

  netWeightSold: number;

  constructor(
    private deliveryService: DeliveryService
  ) { }

  ngOnInit(): void {
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
