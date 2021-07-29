import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as decodeJwt from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Authentication } from 'src/app/commons/models/authentication.model';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
//TODO : des tests unitaires !
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private injector: Injector) {
      const configurationService = this.injector.get(ConfigurationService);
      configurationService.loadConfiguration().subscribe(configuration => this.localeatCoreUrl = configuration.coreUrl);
    }

  authentication = new BehaviorSubject(this.getAuthenticationFromCookie());

  currentAuthentication = this.authentication.asObservable();

  private localeatCoreUrl: string;

  public getAuthenticationFromBackend(identifier: string, password: string ): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization : 'Basic ' + btoa(identifier.toLowerCase() + ':' + password)
      }),
      responseType : 'text' as 'text',
      withCredentials : true
    };
    const response = this.http.get(this.localeatCoreUrl + '/authentication', httpOptions);
    response.subscribe(() => this.authentication.next(this.getAuthenticationFromCookie()));
    return response;
  }

  public refreshAuthenticationFromBackend(token: string): Observable<string> {
    const authentication: Authentication = decodeJwt(token);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization : 'Bearer ' + token
      }),
      responseType : 'text' as 'text',
      withCredentials : true
    };
    const url = this.localeatCoreUrl + '/accounts/' + authentication.account.id + '/authentication';
    const response = this.http.get(url, httpOptions);
    response.subscribe(() => this.authentication.next(this.getAuthenticationFromCookie()), () => this.deleteAuthenticationAnnoymously());
    return response;
  }

  public deleteAuthentication(): Observable<object> {
    const jwt = this.cookieService.get('jwt');
    const authentication: Authentication = decodeJwt(jwt);
    const httpOptions = {
      withCredentials : true
    };
    const url = this.localeatCoreUrl + '/accounts/' + authentication.account.id + '/authentication';
    const response = this.http.delete(url, httpOptions);
    response.subscribe(() => this.authentication.next(this.getAuthenticationFromCookie()));
    return response;
  }

  public deleteAuthenticationAnnoymously(): Observable<object> {
    const httpOptions = {
      withCredentials : true
    };
    const url = this.localeatCoreUrl + '/clearAuthentication';
    const response = this.http.get(url, httpOptions);
    response.subscribe(() => this.authentication.next(this.getAuthenticationFromCookie()));
    return response;
  }

  public isAuthenticated(): boolean {
    const jwt = this.getAuthenticationFromCookie();
    return jwt as unknown as boolean;
  }

  public isAuthorized(authority: string): boolean {
    const jwt = this.getAuthenticationFromCookie();
    console.log(jwt);
    if (jwt) {
      const authorities = jwt.authorities as Array<string>;
      console.log(authorities);
      if ( authorities ) {
        return authorities.includes(authority);
      }
    }
    return false;
  }

  public getAuthenticationFromCookie(): Authentication {
    const cookies: Array<string> = document.cookie.split(';');
    const cookiesNumber: number = cookies.length;
    const cookieName = 'jwt=';
    let currentCookie: string;
    let encodedJwtValue: string;

    for (let i = 0; i < cookiesNumber; i += 1) {
        currentCookie = cookies[i].replace(/^\s+/g, '');
        if (currentCookie.indexOf(cookieName) === 0) {
          encodedJwtValue = currentCookie.substring(cookieName.length, currentCookie.length);
        }
    }
    if ( encodedJwtValue ) {
      return decodeJwt(encodedJwtValue);
    }
    return undefined;
  }

  public renewPassword(email: string, destinationRoute: string): Observable<any> {
    const url = this.localeatCoreUrl + '/passwordRenewal/' + email + '/' + destinationRoute.replace(/^\//, '');
    return this.http.get(url);
  }
}
