import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import * as decodeJwt from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
//TODO : des tests unitaires !
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private authentication = new BehaviorSubject(this.getAuthenticationFromCookie());
  currentAuthentication = this.authentication.asObservable();

  public getAuthenticationFromBackend(identifier: string, password: string ) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization : 'Basic ' + btoa(identifier + ':' + password)
      }),
      responseType : 'text' as 'text',
      withCredentials : true
    };
    const response = this.http.get('http://localhost:8080/authentication', httpOptions);
    response.subscribe(() => this.reloadAuthentication());
    return response;
}

  public reloadAuthentication(){
    this.authentication.next(this.getAuthenticationFromCookie());
  }

  public deleteAuthentication(): void {
    document.cookie = 'jwt=';
    this.authentication.next(undefined);
  }

  public isAuthenticated(): boolean {
    //TODO : utliser l'une des variables locales
    const jwt = this.getAuthenticationFromCookie();
    return jwt as boolean;
  }

  public isAuthenticatedWithAuthority(authority: string): boolean {
    //TODO : utliser l'une des variables locales
    const jwt = this.getAuthenticationFromCookie();
    if (jwt) {
      const authorities = jwt.authorities as Array<string>;
      if ( authorities ) {
        return authorities.includes(authority);
      }
    }
    return false;
  }

  //TODO : créer une classe Authentication pour typer cette méthode
  public getAuthenticationFromCookie() {
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
