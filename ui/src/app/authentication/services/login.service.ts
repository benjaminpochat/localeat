import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  login(identifier: string, password: string ) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization : 'Basic ' + btoa(identifier + ':' + password)
        }),
        responseType : 'text' as 'text',
        withCredentials : true
      };
      this.http.get('http://localhost:8080/authentication', httpOptions).subscribe(
        (body) => console.log(body)
      );
  }

  test() {
    this.http.get('http://localhost:8080/slaughters').subscribe(
      (body) => console.log(body)
    );
  }
}
