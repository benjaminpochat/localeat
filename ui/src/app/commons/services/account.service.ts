import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Account } from 'src/app/commons/models/account.model';
import { Role } from 'src/app/commons/models/role.model';
import { Observable } from 'rxjs';
import { Actor } from '../models/actor.model';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private urlService: UrlService) { }

  createCustomerAccount(actor: Actor, password: string): Observable<string> {
    const account = new Account();
    account.actor = actor;
    account.username = actor.email;
    return this.http.post<string>(this.urlService.getAnonymousUrl(['account']), {
      'password': password,
      'role': Role.Customer,
      'account': account,
      'username': account.actor.email
    });
  }

  saveNewPassword(newPassword: string): Observable<any> {
    return this.http.post<any>(this.urlService.getAuthenticatedUrl(['passwords']), newPassword);
  }
}
