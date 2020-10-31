import { Input } from '@angular/core';
import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
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
    private slaughterService: SlaughterService
  ) { }

  ngOnInit(): void {
  }

  showSlaughterCreation() {
    this.slaughterCreationComponent.slaughter = new Slaughter();
    this.slaughterCreationComponent.createSlaughterEvent = this.createSlaughterEvent;
  }

  showDeliveryCreation(slaughter){
    this.deliveryCreationComponent.initDelivery(slaughter, this.createDeliveryEvent);
    this.deliveryCreationComponent.initForms();
  }

  handleDeliveryCreation(slaughter: Slaughter){
    this.createDeliveryEvent.emit(slaughter);
    //TODO : afficher un message d'info pour confirmer la création (slaughter !== undefined) ou l'annulation (slaughter === undefined)
  }

  cancelSlaughter(slaughter: Slaughter){
    //TODO : faire plutot une suppression logique pour garder la trace des des abattages supprimés
    this.slaughterService.deleteSlaughter(slaughter).subscribe(() => this.cancelSlaughterEvent.emit(slaughter));
  }

}
