import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Account } from 'src/app/commons/models/account.model';
import { Role } from 'src/app/commons/models/role.model';
import { Observable } from 'rxjs';
import { Actor } from '../models/actor.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  createCustomerAccount(actor: Actor, password: string): Observable<string>{
    const account = new Account();
    account.actor = actor;
    account.username = actor.email;
    return this.http.post<string>(environment.localeatCoreUrl + '/account', {
      'password': password,
      'role': Role.Customer,
      'account': account,
      'username': account.actor.email
    });
  }
}
