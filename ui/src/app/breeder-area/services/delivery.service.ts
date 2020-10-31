import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { UrlService } from 'src/app/commons/services/url.service';
import { Order } from 'src/app/commons/models/order.model';
import { Observable } from 'rxjs';

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
}
