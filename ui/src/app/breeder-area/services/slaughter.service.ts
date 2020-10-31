import { Injectable, EventEmitter } from '@angular/core';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/commons/services/url.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlaughterService {

  constructor(
    private http: HttpClient,
    private urlService: UrlService) { }

  public getSlaughters(): Observable<Slaughter[]> {
    return this.http.get<Slaughter[]>(this.urlService.getAuthenticatedUrl(['slaughters']));
  }

  public saveSlaughter(slaughter: Slaughter): Observable<Slaughter> {
    return this.http.post<Slaughter>(this.urlService.getAuthenticatedUrl(['slaughters']), slaughter);
  }

  deleteSlaughter(slaughter: Slaughter): Observable<void> {
    return this.http.delete<void>(this.urlService.getAuthenticatedUrl(['slaughters', slaughter.id.toString()]));
  }
}
