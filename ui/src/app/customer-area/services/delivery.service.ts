import { Injectable, EventEmitter } from '@angular/core';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Animal } from 'src/app/commons/models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  getDeliveries(loopBack: EventEmitter<Delivery[]>) {
    const response = this.http.get<Delivery[]>(environment.localeatCoreUrl + '/deliveries');
    response.subscribe(deliveriesCollected => loopBack.emit(deliveriesCollected));
  }
}
