import { Component, OnInit } from '@angular/core';
import { Slaughter } from 'src/app/commons/models/slaughter.model';

@Component({
  selector: 'app-slaughters-actions',
  templateUrl: './slaughters-actions.component.html',
  styleUrls: ['./slaughters-actions.component.css']
})
export class SlaughtersActionsComponent implements OnInit {

  formCreationShown = false;
  message = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleSlaughterCreation(): void {
    this.formCreationShown = !this.formCreationShown;
  }

  handleCreationResponse(slaughterCreated: Slaughter): void {
    this.formCreationShown = false;
    this.message = 'Un nouvel abattage a été créé avec le n° ' + slaughterCreated.id + ' :)';
  }
}
