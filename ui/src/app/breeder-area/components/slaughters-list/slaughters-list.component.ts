import { Input } from '@angular/core';
import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { AnimalBreedUtils } from 'src/app/commons/models/animal-breed.model';
import { AnimalTypeUtils } from 'src/app/commons/models/animal-type.model';
import { Animal } from 'src/app/commons/models/animal.model';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { AnimalService } from 'src/app/commons/services/animal.service';
import { SlaughterService } from '../../services/slaughter.service';
import { DeliveryCreationComponent } from '../delivery-creation/delivery-creation.component';
import { SlaughterCreationComponent } from '../slaughter-creation/slaughter-creation.component';

@Component({
  selector: 'app-slaughters-list',
  templateUrl: './slaughters-list.component.html',
  styleUrls: ['./slaughters-list.component.css']
})
export class SlaughtersListComponent implements OnInit {

  @Input()
  slaughters: Slaughter[];
  @ViewChild(SlaughterCreationComponent)
  slaughterCreationComponent: SlaughterCreationComponent;
  @ViewChild(DeliveryCreationComponent)
  deliveryCreationComponent: DeliveryCreationComponent;
  @Output()
  createSlaughterEvent = new EventEmitter<Slaughter>();
  @Output()
  cancelSlaughterEvent = new EventEmitter<Slaughter>();
  @Output()
  createDeliveryEvent = new EventEmitter<Slaughter>();

  constructor(
    private slaughterService: SlaughterService,
    private animalService: AnimalService
  ) { }

  ngOnInit(): void {
  }

  showSlaughterCreation() {
    this.slaughterCreationComponent.slaughter = new Slaughter();
    this.slaughterCreationComponent.createSlaughterEvent = this.createSlaughterEvent;
  }

  showDeliveryCreation(slaughter: Slaughter) {
    this.deliveryCreationComponent.initDelivery(slaughter, this.createDeliveryEvent);
    this.deliveryCreationComponent.initForms();
  }

  getAnimalDescription(animal: Animal) {
    return this.animalService.getAnimalDescription(animal);
  }

  handleDeliveryCreation(slaughter: Slaughter) {
    this.createDeliveryEvent.emit(slaughter);
    //TODO : afficher un message d'info pour confirmer la création (slaughter !== undefined) ou l'annulation (slaughter === undefined)
  }

  cancelSlaughter(slaughter: Slaughter) {
    //TODO : faire plutot une suppression logique pour garder la trace des des abattages supprimés
    this.slaughterService.deleteSlaughter(slaughter).subscribe(() => this.cancelSlaughterEvent.emit(slaughter));
  }

}
