import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationInterceptor } from './commons/services/authentication-interceptor.service';
import { BreederAreaModule } from './breeder-area/breeder-area.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerAreaModule } from './customer-area/customer-area.module';

import localeFr from '@angular/common/locales/fr';
import { ConfigurationService } from './commons/services/configuration.service';
registerLocaleData(localeFr);

const appInitializer = (configurationService: ConfigurationService) => {
  return () => {
    return configurationService.loadConfiguration().toPromise();
  };
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // external modules
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,

    // localeat modules
    BreederAreaModule,
    CustomerAreaModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [ConfigurationService]}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
