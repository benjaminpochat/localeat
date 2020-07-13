import { Injectable, Output, EventEmitter } from '@angular/core';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SlaughterService {

  constructor(private http: HttpClient) { }

  public getSlaughters(): Slaughter[] {
    return [];
  }

  public createSlaughter(slaughter: Slaughter, loopBack: EventEmitter<Slaughter>): void{
    const response = this.http.post<Slaughter>(environment.localeatCoreUrl + '/slaughters', slaughter);
    response.subscribe(
      slaughterCreated => {
        console.log('Slaughter saved.');
        loopBack.emit(slaughterCreated);
      });
  }
}
