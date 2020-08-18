import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private authenticationService: AuthenticationService) {
  }

  public getAuthenticatedUrl(uriPathElements: string[]): string{
    return environment.localeatCoreUrl
    + '/accounts/'
    + this.authenticationService.getAuthenticationFromCookie().account.id
    + '/'
    + uriPathElements.join('/');
  }

  public getAnonymousUrl(uriPathElements: string[]): string{
    return environment.localeatCoreUrl
    + '/'
    + uriPathElements.join('/');
  }
}
