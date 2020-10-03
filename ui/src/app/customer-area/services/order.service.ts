import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/commons/models/order.model';
import { UrlService } from 'src/app/commons/services/url.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private urlService: UrlService) { }

  saveOrder(order: Order): Observable<Order>{
    const response = this.http.post<Order>(this.urlService.getAuthenticatedUrl(['orders']), order);
    response.subscribe(() => console.log('ok'));
    return response;
  }
}
