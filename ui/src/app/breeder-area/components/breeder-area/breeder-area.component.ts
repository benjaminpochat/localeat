import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../../commons/services/authentication.service';
import { Router } from '@angular/router';
import { SideMenuComponent } from 'src/app/commons/components/side-menu/side-menu.component';

@Component({
  selector: 'app-breeder-area',
  templateUrl: './breeder-area.component.html',
  styleUrls: ['./breeder-area.component.css']
})
export class BreederAreaComponent implements OnInit {

  @ViewChild(SideMenuComponent)
  private sideMenu: SideMenuComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.isAuthenticated() || !this.isAuthorized()){
      this.router.navigate(['/authentication', {destinationRoute: this.router.url}]);
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
}
