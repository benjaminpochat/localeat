import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/commons/models/order.model';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { DeliveryService } from 'src/app/breeder-area/services/delivery.service';
import { DeliveryOrdersComponent } from '../delivery-orders/delivery-orders.component';
import { PieChartComponent } from 'src/app/commons/components/piechart/piechart.component';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderStatusUtils } from 'src/app/commons/models/order-status.model';

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

  @ViewChild(PieChartComponent)
  pieChartComponent: PieChartComponent;

  backgroundImage: string;

  netWeightSold: number;

  constructor(
    private deliveryService: DeliveryService,
    private sanitizer: DomSanitizer
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
          this.netWeightSold = this.slaughter.delivery.orders.filter(order => OrderStatusUtils.isSold(order.status)).reduce(netWeightSoldCalculator, 0);
          this.pieChartComponent.setRadius(this.slaughter.animal.meatWeight > 0  && this.netWeightSold > 0 ? (360 * this.netWeightSold / this.slaughter.animal.meatWeight) : 0);
        });
      }
  }

  showDeliveryOrders(): void {
    this.deliveryOrdersComponent.initDelivery(this.slaughter);
  }

  generateBills(): void {
    this.deliveryService.generateBills(this.slaughter.delivery).subscribe(data => this.downloadFile(data, 'factures.pdf'));
  }

  generateOrdersLabels(): void {
    this.deliveryService.generateOrdersLabels(this.slaughter.delivery).subscribe(data => this.downloadFile(data, 'etiquettes_commandes.pdf'));
  }

  generateProductElementsLabels(): void {
    const elementsNames = "Bavette§Bourguignon§Côte§Faux filet§Filet§Hampe§Queue§Jarret§Joues§Onglet§Paleron§Pot-au-feu§Rosbeef§Roti§Rumsteak§Steaks§Steaks burger"
    this.deliveryService.generateProductElementsLabels(this.slaughter.delivery, elementsNames).subscribe(data => this.downloadFile(data, 'etiquettes_paquets.pdf'));
  }

  downloadFile(response: any, filename: string) {
    let dataType = response.type;
    let binaryData = [];
    binaryData.push(response);
    let downloadLink = document.createElement('a');
    downloadLink.target = '_blank'
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    downloadLink.download = filename
    document.body.appendChild(downloadLink);
    downloadLink.click();  
  }
}
