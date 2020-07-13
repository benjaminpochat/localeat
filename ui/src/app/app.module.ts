import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationInterceptor } from './commons/services/authentication-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomerAreaModule } from './customer-area/customer-area.module';
import { BreederAreaModule } from './breeder-area/breeder-area.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
