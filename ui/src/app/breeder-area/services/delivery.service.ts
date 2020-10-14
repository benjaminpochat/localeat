import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { UrlService } from 'src/app/commons/services/url.service';
import { Order } from 'src/app/commons/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(
    private http: HttpClient,
    private urlService: UrlService) { }

  public getDeliveries(loopBack: EventEmitter<Delivery[]>): void {
    const response = this.http.get<Delivery[]>(this.urlService.getAuthenticatedUrl(['deliveries']));
    response.subscribe(deliveriesCollected => loopBack.emit(deliveriesCollected));
  }

  public getDeliveryOrders(delivery: Delivery, loadOrdersEvent: EventEmitter<Order[]>){
    const response = this.http.get<Order[]>(this.urlService.getAuthenticatedUrl(['deliveries', delivery.id.toString(), 'orders']));
    response.subscribe(orders => loadOrdersEvent.emit(orders));
  }
}
