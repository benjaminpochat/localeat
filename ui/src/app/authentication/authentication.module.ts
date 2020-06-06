import { NgModule } from '@angular/core';

import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class AuthenticationModule { }
