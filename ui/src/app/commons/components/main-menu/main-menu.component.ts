import { Component, OnInit, Output, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/commons/../commons/services/authentication.service';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from 'src/app/commons/models/authentication.model';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  @Output()
  sideMenuActivated = new EventEmitter<boolean>();
  @Input()
  sideMenuDisabled = true;
  @Input()
  loginForced = true;
  authentication: Authentication;

  constructor(
    private authenticationService: AuthenticationService,
    private sideMenuComponent: SideMenuComponent,
    private router: Router) { }

  ngOnInit(): void {
    this.authenticationService.currentAuthentication.subscribe(authentication => this.authentication = authentication);
  }

  logout() {
    this.authenticationService.deleteAuthentication();
    if (this.loginForced){
      this.router.navigate(['/authentication', {destinationRoute: this.router.url}]);
    }
  }

  goToLoginPage() {
    this.router.navigate(['/authentication', { destinationRoute: this.router.url }]);
  }

  showSideMenu(): void {
    this.sideMenuActivated.emit(true);
  }
}
