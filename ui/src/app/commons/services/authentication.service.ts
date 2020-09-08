import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as decodeJwt from 'jwt-decode';
import { Authentication } from 'src/app/commons/models/authentication.model';

@Injectable({
  providedIn: 'root'
})
//TODO : des tests unitaires !
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authentication = new BehaviorSubject(this.getAuthenticationFromCookie());
  currentAuthentication = this.authentication.asObservable();

  public getAuthenticationFromBackend(identifier: string, password: string ): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization : 'Basic ' + btoa(identifier + ':' + password)
      }),
      responseType : 'text' as 'text',
      withCredentials : true
    };
    const response = this.http.get(environment.localeatCoreUrl + '/authentication', httpOptions);
    response.subscribe(() => this.authentication.next(this.getAuthenticationFromCookie()));
    return response;
  }

  public deleteAuthentication(): void {
    document.cookie = 'jwt=';
    this.authentication.next(undefined);
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
}
