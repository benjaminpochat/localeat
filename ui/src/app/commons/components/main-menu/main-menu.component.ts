import { Component, OnInit, Output, Input } from '@angular/core';
import { AuthenticationService } from '../../../commons/services/authentication.service';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  @Output() sideMenuActivated = new EventEmitter<boolean>();
  @Input() sideMenuDisabled = true;
  authentication;

  constructor(
    private authenticationService: AuthenticationService,
    private sideMenuComponent: SideMenuComponent) { }

  ngOnInit(): void {
    this.authenticationService.currentAuthentication.subscribe(authentication => this.authentication = authentication);
  }

  logout() {
    this.authenticationService.deleteAuthentication();
  }

  showSideMenu(): void {
    this.sideMenuActivated.emit(true);
  }
}
