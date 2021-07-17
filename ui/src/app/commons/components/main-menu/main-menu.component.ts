import { Component, OnInit, Output, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/commons/../commons/services/authentication.service';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from 'src/app/commons/models/authentication.model';
import { ConfigurationService, EnvironmentType } from '../../services/configuration.service';

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

  environmentType: EnvironmentType;

  constructor(
    private authenticationService: AuthenticationService,
    private configurationService: ConfigurationService,
    private sideMenuComponent: SideMenuComponent,
    private router: Router) { }

  ngOnInit(): void {
    this.authenticationService.currentAuthentication.subscribe(authentication => this.authentication = authentication);
    this.configurationService.loadConfiguration().subscribe(configuration => this.environmentType = configuration.environmentType);
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

  isNotProductionEnvironment(): boolean {
    return this.environmentType !== EnvironmentType.Prod;
  }
}
