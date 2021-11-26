import { Injectable, EventEmitter } from '@angular/core';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Animal } from 'src/app/commons/models/animal.model';
import { Observable } from 'rxjs';
import { UrlService } from 'src/app/commons/services/url.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(
    private http: HttpClient,
    private urlService: UrlService) { }

  getDeliveries(loopBack: EventEmitter<Delivery[]>, sharedKey?: string): void {
    const sharedKeyQueryParam = sharedKey ? `?sharedKey=${sharedKey}` : '';
    const response = this.http.get<Delivery[]>(this.urlService.getAnonymousUrl(['deliveries' + sharedKeyQueryParam]));
    response.subscribe(deliveriesCollected => loopBack.emit(deliveriesCollected));
  }

  getAnimalForDelivery(delivery: Delivery): Observable<Animal> {
    return this.http.get<Animal>(this.urlService.getAnonymousUrl(['deliveries', String(delivery.id), 'animals']));
  }

  async getQuantitySoldForDelivery(delivery: Delivery): Promise<number> {
    return fetch(this.urlService.getAnonymousUrl(['deliveries', String(delivery.id), 'quantitySold'])).then(response => response.json());
  }
}
