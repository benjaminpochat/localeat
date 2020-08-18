import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { UrlService } from 'src/app/commons/services/url.service';

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
}
