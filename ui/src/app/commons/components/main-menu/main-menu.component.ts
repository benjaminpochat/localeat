import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../../commons/services/authentication.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  authentication;

  ngOnInit(): void {
    this.authenticationService.currentAuthentication.subscribe(authentication => this.authentication = authentication);
  }

  logout() {
    this.authenticationService.deleteAuthentication();
  }

}
