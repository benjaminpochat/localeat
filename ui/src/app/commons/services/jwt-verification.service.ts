import { Injectable, Injector } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class JwtVerificationService {

  constructor(
    private cookieService: CookieService,
    private injector: Injector
  ) {
  }

  verifyJwt(): void {
    const authenticationService = this.injector.get(AuthenticationService);
    const jwt = this.cookieService.get('jwt');
    authenticationService.refreshAuthenticationFromBackend(jwt);

  }
}
