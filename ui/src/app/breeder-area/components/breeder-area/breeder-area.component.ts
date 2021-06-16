import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { SideMenuComponent } from 'src/app/commons/components/side-menu/side-menu.component';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { DeliveryService } from 'src/app/breeder-area/services/delivery.service';
import { SlaughterService } from 'src/app/breeder-area/services/slaughter.service';

@Component({
  selector: 'app-breeder-area',
  templateUrl: './breeder-area.component.html',
  styleUrls: ['./breeder-area.component.css']
})
export class BreederAreaComponent implements OnInit {

  @ViewChild(SideMenuComponent)
  private sideMenu: SideMenuComponent;

  @Output()
  createSlaughterEvent = new EventEmitter<Slaughter>();

  @Output()
  cancelSlaughterEvent = new EventEmitter<Delivery>();

  @Output()
  createDeliveryEvent = new EventEmitter<Delivery>();

  slaughters: Slaughter[];
  deliveries: Delivery[];

  constructor(
    private authenticationService: AuthenticationService,
    private slaughterService: SlaughterService,
    private deliveryService: DeliveryService,
    private router: Router) { }

  ngOnInit(): void {
    this.redirectToLoginIfNotAuthorized();
    this.refreshSlaughters();
    this.refreshDeliveries();
  }

  getSlaughtersWithDelivery(): Slaughter[] {
    return this.slaughters === undefined ? [] : this.slaughters.filter(slaughter => slaughter.delivery);
  }

  private refreshSlaughters() {
    this.slaughterService.getSlaughters().subscribe(slaughters => this.slaughters = slaughters);
  }

  private refreshDeliveries() {
    this.deliveryService.getDeliveries().subscribe(deliveries => this.deliveries = deliveries);
  }

  redirectToLoginIfNotAuthorized() {
    if (!this.isAuthenticated() || !this.isAuthorized()) {
      this.router.navigate(['/authentication', { destinationRoute: this.router.url }]);
    }
  }

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  isAuthorized(): boolean {
    return this.authenticationService.isAuthorized('BREEDER');
  }

  showSideMenu(sideMenuShown: boolean){
    this.sideMenu.showSideMenu();
  }

  showContent(contentId: string){
    document.getElementById(contentId).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'});
  }

  handleSlaughterCreation(slaughterCreated: Slaughter) {
    this.refreshSlaughters();
  }

  handleSlaughterCancellation(slaughterCacelled: Slaughter) {
    this.refreshSlaughters();
  }

  handleDeliveryCreation(slaughterPublished: Slaughter) {
    this.refreshDeliveries();
  }
}
