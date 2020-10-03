import { Component, OnInit } from '@angular/core';
import { Authentication } from 'src/app/commons/models/authentication.model';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';

@Component({
  selector: 'app-customer-area',
  templateUrl: './customer-area.component.html',
  styleUrls: ['./customer-area.component.css']
})
export class CustomerAreaComponent implements OnInit {
  router: any;
  authentication: Authentication;

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authenticationService.currentAuthentication.subscribe(authentication => {
      this.authentication = authentication;
    });
  }


}
