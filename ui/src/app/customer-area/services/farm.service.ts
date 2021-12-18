import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/commons/services/url.service';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  constructor(
    private http: HttpClient,
    private urlService: UrlService
  ) { 
  }

  async getRandomFarmSlideshowUrl(): Promise<string> {
    return fetch(this.urlService.getAnonymousUrl(['farms', 'random', 'slideshowurl'])).then(response => {
      return response.text()
    });
  }
}
