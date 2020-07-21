import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Slaughter } from 'src/app/commons/models/slaughter.model';

@Component({
  selector: 'app-slaughters-actions',
  templateUrl: './slaughters-actions.component.html',
  styleUrls: ['./slaughters-actions.component.css']
})
export class SlaughtersActionsComponent implements OnInit {

  @Output()
  creationLoopBack = new EventEmitter<Slaughter>();


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
    if (slaughterCreated){
      this.creationLoopBack.emit(slaughterCreated);
      this.message = 'Un nouvel abattage a été créé.';
    }
  }
}
