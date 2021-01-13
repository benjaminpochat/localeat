import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './authentication.service';
import * as decodeJwt from 'jwt-decode';
import { Authentication } from '../models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: CookieService,
    private authenticationService: AuthenticationService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
      let jwt = this.cookieService.get('jwt');
      this.refreshJwtExpiredIn15Minutes(jwt, req);
      if (jwt && !req.headers.get('Authorization')) {
          const cloned = req.clone({
              headers: req.headers.set('Authorization',
                  'Bearer ' + jwt)
          });
          return next.handle(cloned);
      }
      else {
          return next.handle(req);
      }
  }

  private refreshJwtExpiredIn15Minutes(jwt: string, req: HttpRequest<any>) {
    if (jwt && !req.url.match('accounts/\\w+/authentication')) {
      const authentication = decodeJwt(jwt) as Authentication;
      const now = new Date();
      const fifteenMinutesBeforeExpiration = new Date(authentication.expiration);
      fifteenMinutesBeforeExpiration.setMinutes(fifteenMinutesBeforeExpiration.getMinutes() - 15);
      if (now > fifteenMinutesBeforeExpiration) {
        this.authenticationService.refreshAuthenticationFromBackend(jwt);
      }
    }
  }
}
