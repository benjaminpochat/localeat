import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../commons/services/authentication.service';

@Component({
  selector: 'app-breeder-area',
  templateUrl: './breeder-area.component.html',
  styleUrls: ['./breeder-area.component.css']
})
export class BreederAreaComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  authentication;

  ngOnInit(): void {
    this.authenticationService.currentAuthentication.subscribe(authentication => this.authentication = authentication);
  }

  isAuthorized(): boolean {
    if (!this.authentication){
      return false;
    }
    const authorities = this.authentication.authorities as Array<string>;
    if ( authorities ) {
      return authorities.includes("BREEDER");
    }
    return false;
  }

}
