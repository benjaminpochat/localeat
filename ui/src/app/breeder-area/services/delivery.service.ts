import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  public getDeliveries(loopBack: EventEmitter<Delivery[]>): void {
    const response = this.http.get<Delivery[]>(environment.localeatCoreUrl + '/deliveries');
    response.subscribe(deliveriesCollected => loopBack.emit(deliveriesCollected));
  }
}
