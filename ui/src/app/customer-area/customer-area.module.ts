import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAreaComponent } from './components/customer-area/customer-area.component';
import { DeliveriesListComponent } from './components/deliveries-list/deliveries-list.component';
import { MainMenuComponent } from '../commons/components/main-menu/main-menu.component';
import { CommonsModule } from '../commons/commons.module';

@NgModule({
  declarations: [
    CustomerAreaComponent,
    DeliveriesListComponent,
  ],
  imports: [
    CommonModule,
    CommonsModule
  ],
  exports: [
    CustomerAreaComponent,
  ]
})
export class CustomerAreaModule { }
