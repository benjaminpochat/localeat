import { NgModule, LOCALE_ID } from '@angular/core';
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
import { OrderListComponent } from './customer-area/components/order-list/order-list.component';
registerLocaleData(localeFr);

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
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
