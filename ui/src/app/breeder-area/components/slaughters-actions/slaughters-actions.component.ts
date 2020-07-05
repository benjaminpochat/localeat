import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slaughters-actions',
  templateUrl: './slaughters-actions.component.html',
  styleUrls: ['./slaughters-actions.component.css']
})
export class SlaughtersActionsComponent implements OnInit {

  slaughterFormCreation = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleSlaughterCreation(): void {
    this.slaughterFormCreation = !this.slaughterFormCreation;
  }
}
