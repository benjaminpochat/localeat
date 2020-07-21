import { Injectable, EventEmitter } from '@angular/core';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SlaughterService {

  constructor(private http: HttpClient) { }

  public getSlaughters(loopBack: EventEmitter<Slaughter[]>): void {
    const response = this.http.get<Slaughter[]>(environment.localeatCoreUrl + '/slaughters');
    response.subscribe(slaughtersCollected => loopBack.emit(slaughtersCollected));
  }

  public saveSlaughter(slaughter: Slaughter, loopBack: EventEmitter<Slaughter>): void{
    const response = this.http.post<Slaughter>(environment.localeatCoreUrl + '/slaughters', slaughter);
    response.subscribe(
      slaughterCreated => {
        loopBack.emit(slaughterCreated);
      });
  }
}
