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
  contentShown = new EventEmitter<Object>();

  @ViewChild(MatSidenav)
  sideNav: MatSidenav;

  @Input()
  pages : {label :string, id: Object}[]

  constructor() {}

  ngOnInit(): void {
  }

  getPages(): {label: string, id: Object}[] {
    return this.pages;
  }

  setPages(pages: {label: string, id: Object}[]): void {
    this.pages = pages;
  }

  hideSideMenu(): void {
    this.sideNav.close();
    this.sideMenuShown = false;
  }

  showSideMenu(): void {
    this.sideNav.open();
    //this.sideMenuShown = true;
  }

  showPage(pageId: Object) {
    this.contentShown.emit(pageId);
    this.hideSideMenu();
  }
/*
  showSlaughtersList(): void {
    this.contentShown.emit('slaughters-list');
    this.hideSideMenu();
  }

  showSalesList(): void {
    this.contentShown.emit('sales-list');
    this.hideSideMenu();
  }

  showProductsList(): void {
    this.contentShown.emit('products-list');
    this.hideSideMenu();
  }
  */
}
