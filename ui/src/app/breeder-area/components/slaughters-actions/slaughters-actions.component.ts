import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { SideMenuComponent } from 'src/app/commons/components/side-menu/side-menu.component';
import { SlaughterCreationComponent } from '../slaughter-creation/slaughter-creation.component';

@Component({
  selector: 'app-slaughters-actions',
  templateUrl: './slaughters-actions.component.html',
  styleUrls: ['./slaughters-actions.component.css']
})
export class SlaughtersActionsComponent implements OnInit {

  @Output()
  creationLoopBack = new EventEmitter<Slaughter>();

  @ViewChild(SlaughterCreationComponent)
  private slaughterCreationComponent: SlaughterCreationComponent;

  creationFormShown = false;
  message = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleSlaughterCreation(): void {
    this.creationFormShown = !this.creationFormShown;
  }

  handleCreationResponse(slaughterCreated: Slaughter): void {
    this.creationFormShown = false;
    this.creationLoopBack.emit(slaughterCreated);
    this.message = 'Un nouvel abattage a été créé avec le n° ' + slaughterCreated.id + ' :)';
  }
}
