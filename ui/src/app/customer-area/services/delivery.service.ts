import { Injectable, EventEmitter } from '@angular/core';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Animal } from 'src/app/commons/models/animal.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  getDeliveries(loopBack: EventEmitter<Delivery[]>): void {
    const response = this.http.get<Delivery[]>(environment.localeatCoreUrl + '/deliveries');
    response.subscribe(deliveriesCollected => loopBack.emit(deliveriesCollected));
  }

  getAnimalForDelivery(delivery: Delivery): Observable<Animal> {
    return this.http.get<Animal>(environment.localeatCoreUrl + '/deliveries/' + delivery.id + '/animals');
  }

  getQuantitySoldForDelivery(delivery: Delivery): Observable<number> {
    return this.http.get<number>(environment.localeatCoreUrl + '/deliveries/' + delivery.id + '/quantitySold');
  }
}
