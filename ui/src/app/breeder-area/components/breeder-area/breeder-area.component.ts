import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../commons/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breeder-area',
  templateUrl: './breeder-area.component.html',
  styleUrls: ['./breeder-area.component.css']
})
export class BreederAreaComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  currentUrl: string = this.router.url;

  ngOnInit(): void {
  }

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  isAuthorized(): boolean {
    return this.authenticationService.isAuthorized('BREEDER');
  }

}
