import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAreaComponent } from './components/customer-area/customer-area.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
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
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';
import { OrderComponent } from './components/order/order.component';
import { MatIconModule } from '@angular/material/icon';
import { ProductComponent } from './components/product/product.component';
import { ProductSelectorComponent } from './components/product-selector/product-selector.component';
import { OrderItemComponent } from './components/order-item/order-item.component';

@NgModule({
  declarations: [
    CustomerAreaComponent,
    DeliveryComponent,
    OrderDialogComponent,
    OrderComponent,
    OrderItemComponent,
    ProductComponent,
    ProductSelectorComponent,
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
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatRadioModule,
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
