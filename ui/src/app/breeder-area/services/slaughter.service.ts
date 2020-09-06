import { Injectable, EventEmitter } from '@angular/core';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/commons/services/url.service';
import { Product } from 'src/app/commons/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class SlaughterService {

  constructor(
    private http: HttpClient,
    private urlService: UrlService) { }

  public getSlaughters(loopBack: EventEmitter<Slaughter[]>): void {
    const response = this.http.get<Slaughter[]>(this.urlService.getAuthenticatedUrl(['slaughters']));
    response.subscribe(slaughtersCollected => loopBack.emit(slaughtersCollected));
  }

  public saveSlaughter(slaughter: Slaughter, loopBack: EventEmitter<Slaughter>): void{
    const response = this.http.post<Slaughter>(this.urlService.getAuthenticatedUrl(['slaughters']), slaughter);
    response.subscribe(
      slaughterCreated => {
        loopBack.emit(slaughterCreated);
      });
  }
}
