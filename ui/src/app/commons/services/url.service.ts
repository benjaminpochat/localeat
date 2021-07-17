import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private localeatCoreUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private configurationService: ConfigurationService,
    ) {
      this.configurationService.loadConfiguration().subscribe(configuration => this.localeatCoreUrl = configuration.coreUrl);
  }

  public getAuthenticatedUrl(uriPathElements: string[]): string {
    return this.localeatCoreUrl
    + '/accounts/'
    + this.authenticationService.getAuthenticationFromCookie().account.id
    + '/'
    + uriPathElements.join('/');
  }

  public getAnonymousUrl(uriPathElements: string[]): string{
    return this.localeatCoreUrl
    + '/'
    + uriPathElements.join('/');
  }
}
