import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

export enum EnvironmentType {
  Prod = 'prod',
  Demo = 'demo',
  Staging = 'staging',
  Test = 'test',
  Dev = 'dev',
  Local = 'local',
}

interface Configuration {
  coreUrl: string;
  environmentType: EnvironmentType;
}

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  private configuration: Observable<Configuration>;

  constructor(private http: HttpClient) { }

  loadConfiguration(): Observable<Configuration> {
    if (!this.configuration) {
      this.configuration = this.http.get<Configuration>('/assets/config/config.json').pipe(shareReplay(1));
    }
    return this.configuration;
  }
}
