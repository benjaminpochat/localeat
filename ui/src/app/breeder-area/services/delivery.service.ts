import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { UrlService } from 'src/app/commons/services/url.service';
import { Order } from 'src/app/commons/models/order.model';
import { Observable } from 'rxjs';
import { OrderItem } from 'src/app/commons/models/order-item.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(
    private http: HttpClient,
    private urlService: UrlService) { }

  public getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.urlService.getAuthenticatedUrl(['deliveries']));
  }

  public getDeliveryOrders(delivery: Delivery): Observable<Order[]>{
    return this.http.get<Order[]>(this.urlService.getAuthenticatedUrl(['deliveries', delivery.id.toString(), 'orders']));
  }

  public setOrderTotalPrice(order: Order): void {
    const reducer = (accumulator: number, orderItem: OrderItem) =>
      accumulator
      + orderItem.quantity * orderItem.batch.product.netWeight * orderItem.batch.product.unitPrice;
    order.totalPrice = order.orderedItems.reduce(reducer, 0);
  }

  public setOrderTotalNetWeight(order: Order): void {
    const reducer = (accumulator: number, orderItem: OrderItem): number =>
      accumulator + orderItem.quantity * orderItem.batch.product.netWeight;
    order.totalNetWeight = order.orderedItems.reduce(reducer, 0);
  }

  public saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.urlService.getAuthenticatedUrl(['deliveries', order.delivery.id.toString(), 'orders']), order);
  }

}
