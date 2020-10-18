import { NgModule } from '@angular/core';
import { SlaughtersListComponent } from './components/slaughters-list/slaughters-list.component';
import { BreederAreaComponent } from './components/breeder-area/breeder-area.component';
import { SlaughtersActionsComponent } from './components/slaughters-actions/slaughters-actions.component';
import { SlaughterCreationComponent } from './components/slaughter-creation/slaughter-creation.component';
import { CommonsModule } from '../commons/commons.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { SalesListComponent } from './components/sales-list/sales-list.component';
import { SalePublicationComponent } from './components/sale-publication/sale-publication.component';
import { DeliveryOrdersTableComponent } from './components/delivery-orders-table/delivery-orders-table.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

@NgModule({
  declarations: [
    BreederAreaComponent,
    SalePublicationComponent,
    SalesListComponent,
    SlaughtersActionsComponent,
    SlaughtersListComponent,
    SlaughterCreationComponent,
    DeliveryOrdersTableComponent,
    ProductsListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
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
    BreederAreaComponent
  ]
})
export class BreederAreaModule { }
