import { Injectable, Injector } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './authentication.service';
import { ConfigurationService } from './configuration.service';

@Injectable({ providedIn: 'root' })
export class JwtVerificationService {

  constructor(
    private cookieService: CookieService,
    private injector: Injector
  ) {
  }

  verifyJwt(): void {
    const configurationService = this.injector.get(ConfigurationService);
    const authenticationService = this.injector.get(AuthenticationService);
    // configuration loading must be done before the jwt is checked
    configurationService.loadConfiguration().subscribe(() => {
      const jwt = this.cookieService.get('jwt');
      if (jwt) {
        authenticationService.refreshAuthenticationFromBackend(jwt);
      }
    });
  }
}
