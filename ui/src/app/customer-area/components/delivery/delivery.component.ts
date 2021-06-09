import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { DeliveryService } from 'src/app/customer-area/services/delivery.service';
import { MatDialog } from '@angular/material/dialog';
import { Animal } from 'src/app/commons/models/animal.model';
import { AnimalService } from 'src/app/commons/services/animal.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  @Input()
  delivery: Delivery;

  animal: Animal;

  @Output()
  createOrderEvent = new EventEmitter<Delivery>();

  orderComponentShown = false;

  constructor(
    private deliveryService: DeliveryService,
    private animalService: AnimalService,
    public orderDialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.deliveryService.getAnimalForDelivery(this.delivery).subscribe(
      animal => this.animal = animal);
  }

  showOrderComponent(delivery: Delivery) {
    this.createOrderEvent.emit(delivery);
  }

  getAnimalLabel(): string {
    return this.animalService.getAnimalDescription(this.animal);
  }
}
