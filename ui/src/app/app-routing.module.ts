import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryComponent } from './delivery/components/delivery/delivery.component';
import { AuthenticationComponent } from './commons/components/authentication/authentication.component';
import { BreederAreaComponent } from './breeder-area/components/breeder-area/breeder-area.component';


const routes: Routes = [
  { path: '', redirectTo: 'deliveries', pathMatch: 'full' },
  { path: 'deliveries', component: DeliveryComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'breeder-area', component:  BreederAreaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
