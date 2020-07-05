import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './commons/components/authentication/authentication.component';
import { BreederAreaComponent } from './breeder-area/components/breeder-area/breeder-area.component';
import { CustomerAreaComponent } from './customer-area/components/customer-area/customer-area.component';


const routes: Routes = [
  { path: '', redirectTo: 'customer-area', pathMatch: 'full' },
  { path: 'customer-area', component: CustomerAreaComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'breeder-area', component:  BreederAreaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
