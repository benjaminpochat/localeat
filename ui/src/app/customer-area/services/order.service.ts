import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Order } from 'src/app/commons/models/order.model';
import { UrlService } from 'src/app/commons/services/url.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient,
    private urlService: UrlService) { }

  saveOrder(order: Order): Observable<Order>{
    const response = this.httpClient.post<Order>(this.urlService.getAuthenticatedUrl(['orders']), order).pipe(share());
    return response;
  }

  getCustomerCurrentOrders(refreshOrdersEvent: EventEmitter<Order[]>): void {
    const response = this.httpClient.get<Order[]>(this.urlService.getAuthenticatedUrl(['orders'])).pipe(share());
    response.subscribe(orders => refreshOrdersEvent.emit(orders));
  }

  getTotalPrice(order: Order): number {
    return order.orderedItems.map(item => item.quantity * item.batch.product.netWeight * item.unitPrice).reduce( (sum, itemPrice) => sum + itemPrice, 0);
  }

  getOrder(orderId: string): Observable<Order> {
    const response = this.httpClient.get<Order>(this.urlService.getAuthenticatedUrl(['orders', orderId])).pipe(share());
    return response;
  }
}
