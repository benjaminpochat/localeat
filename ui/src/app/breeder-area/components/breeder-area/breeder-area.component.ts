import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../../../commons/services/authentication.service';
import { Router } from '@angular/router';
import { SideMenuComponent } from 'src/app/commons/components/side-menu/side-menu.component';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { SalesListComponent } from '../sales-list/sales-list.component';

@Component({
  selector: 'app-breeder-area',
  templateUrl: './breeder-area.component.html',
  styleUrls: ['./breeder-area.component.css']
})
export class BreederAreaComponent implements OnInit {

  @ViewChild(SideMenuComponent)
  private sideMenu: SideMenuComponent;

  @ViewChild(SalesListComponent)
  private salesList: SalesListComponent;

  @Output()
  salePublicationLoopBack = new EventEmitter<Delivery>();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.redirectToLoginIfNotAuthorized();
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

  handleSalePublication(slaughterPublished: Slaughter){
    this.salesList.refreshDeliveries();
  }
}
