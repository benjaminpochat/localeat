import { Component, OnInit, ViewChild, ElementRef, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  @Input()
  sideMenuShown = false;

  @Output()
  contentShown = new EventEmitter<string>();

  @ViewChild(MatSidenav)
  sideNav: MatSidenav;

  constructor() { }

  ngOnInit(): void {
  }

  hideSideMenu(): void {
    this.sideNav.close();
    this.sideMenuShown = false;
  }

  showSideMenu(): void {
    this.sideNav.open();
    //this.sideMenuShown = true;
  }

  showSlaughtersList(): void {
    this.contentShown.emit('slaughters-list');
    this.hideSideMenu();
  }

  showSalesList(): void {
    this.contentShown.emit('sales-list');
    this.hideSideMenu();
  }

  showDeliveriesList(): void {
    this.contentShown.emit('deliveries-list');
    this.hideSideMenu();
  }
}
