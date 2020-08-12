import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAreaComponent } from './components/customer-area/customer-area.component';
import { DeliveriesListComponent } from './components/deliveries-list/deliveries-list.component';
import { MainMenuComponent } from '../commons/components/main-menu/main-menu.component';
import { CommonsModule } from '../commons/commons.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CustomerAreaComponent,
    DeliveriesListComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatTableModule,
    ReactiveFormsModule,
    CommonsModule
  ],
  exports: [
    CustomerAreaComponent,
  ]
})
export class CustomerAreaModule { }
