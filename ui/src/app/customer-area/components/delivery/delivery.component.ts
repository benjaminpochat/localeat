import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { DeliveryService } from 'src/app/customer-area/services/delivery.service';
import { MatDialog } from '@angular/material/dialog';
import { Animal } from 'src/app/commons/models/animal.model';
import { AnimalService } from 'src/app/commons/services/animal.service';
import { PieChartComponent } from 'src/app/commons/components/piechart/piechart.component';
import { Farm } from 'src/app/commons/models/farm.model';
import { Batch } from 'src/app/commons/models/batch.model';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  @Input()
  delivery: Delivery;

  @ViewChild(PieChartComponent)
  pieChartComponent: PieChartComponent;

  @Output()
  createOrderEvent = new EventEmitter<Delivery>();

  @Output()
  showSlideshowEvent = new EventEmitter<Farm>();


  animal: Animal;

  quantitySold = 0;

  orderComponentShown = false;

  constructor(
    private deliveryService: DeliveryService,
    private animalService: AnimalService,
    public orderDialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.deliveryService.getAnimalForDelivery(this.delivery).subscribe(
      animal => this.animal = animal);
    this.deliveryService.getQuantitySoldForDelivery(this.delivery).then(
      quantitySold => {
        this.pieChartComponent.setRadius(360 * quantitySold);
        this.quantitySold = quantitySold;
      }
    );
  }

  showOrderComponent(delivery: Delivery) {
    this.createOrderEvent.emit(delivery);
  }

  getAnimalLabel(): string {
    return this.animalService.getAnimalDescription(this.animal);
  }

  isCertifiedLabelRouge(): boolean {
    return this.animal?.certifiedLabelRouge;
  }

  showFarmSlideshow() {
    this.showSlideshowEvent.emit(this.animal.finalFarm);
  }

  getAddress(): string {
    return "Adresse de livraison<br>" 
    + [this.delivery.deliveryAddress.name,
      this.delivery.deliveryAddress.addressLine1,
      this.delivery.deliveryAddress.addressLine2,
      this.delivery.deliveryAddress.addressLine3,
      this.delivery.deliveryAddress.addressLine4,
      this.delivery.deliveryAddress.zipCode,
      this.delivery.deliveryAddress.city]
      .filter(addressElement => addressElement).join("<br>")
  }

  getBatches(): Batch[] {
    return this.delivery.availableBatches.sort((batch1, batch2) => batch1.product.name.localeCompare(batch2.product.name));
  }
}
