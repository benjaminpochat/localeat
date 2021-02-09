import { Account } from '../models/account.model';
import { Actor } from '../models/actor.model';
import { Authentication } from '../models/authentication.model';
import { AuthenticationService } from './authentication.service';

export class AuthenticationServiceMock {

  private getAuthentication(): Authentication {
    const actor = new Actor();
    actor.email = 'louis.lachenal@montblanc.fr';
    actor.name = 'Lachenal';
    actor.firstName = 'Louis';
    actor.phoneNumber = '01 23 45 67 89';
    const account = new Account();
    account.id = 1;
    account.username = 'louis.lachenal';
    account.actor = actor;
    const authentication = new Authentication();
    authentication.authorities = ['CUSTOMER'];
    authentication.account = account;
    return authentication;
  }

  public mockGetAuthenticationWithNonNullReturnValue(authenticationService: AuthenticationService): void {
    authenticationService.getAuthenticationFromCookie = this.getAuthentication;
  }

  public mockGetAuthenticationWithNullReturnValue(authenticationService: AuthenticationService): void {
    authenticationService.getAuthenticationFromCookie = () => null;
  }

}
