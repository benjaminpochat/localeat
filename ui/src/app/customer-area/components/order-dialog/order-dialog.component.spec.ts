import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { Type } from '@angular/core';

import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { Authentication } from 'src/app/commons/models/authentication.model';
import { Account } from 'src/app/commons/models/account.model';
import { Actor } from 'src/app/commons/models/actor.model';
import { CommonsModule } from 'src/app/commons/commons.module';
import { OrderDialogComponent } from './order-dialog.component';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { Product } from 'src/app/commons/models/product.model';
import { Animal } from 'src/app/commons/models/animal.model';
import { Farm } from 'src/app/commons/models/farm.model';
import { DeliveryAddress } from 'src/app/commons/models/delivery-address.model';
import { AuthenticationServiceMock } from 'src/app/commons/services/authentication.service.mock';
import { Batch } from 'src/app/commons/models/batch.model';

describe('OrderDialogComponent', () => {

  const basicAngularImports = [
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule
  ];

  const materialImports = [
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
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatTableModule,
  ];

  const deliveryAddress = new DeliveryAddress();
  deliveryAddress.name = 'Place de la République';
  const farm = new Farm();
  farm.name = 'La ferme de la rivère';
  const animal = new Animal();
  animal.finalFarm = farm;
  const product = new Product();
  product.description = 'une belle vache';
  product.unitPrice = 13.5;
  const batch = new Batch();
  batch.animal = animal;
  batch.product = product;
  const delivery = new Delivery();
  delivery.availableBatches = [batch];
  delivery.deliveryAddress = deliveryAddress;

  describe('with no authentication', () => {
    let component: OrderDialogComponent;
    let fixture: ComponentFixture<OrderDialogComponent>;
    let authenticationService: AuthenticationService;


    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          OrderDialogComponent
        ],
        imports: [
          HttpClientTestingModule,
          CommonsModule
        ].concat(
          basicAngularImports,
          materialImports),
        providers: [
          FormBuilder,
          { provide: MAT_DIALOG_DATA, useValue: delivery }
        ]
      })
      .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(OrderDialogComponent);
      component = fixture.componentInstance;
      authenticationService = fixture.debugElement.injector.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
      authenticationService.deleteAuthentication();
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });


  describe('with a user authenticated', () => {
    let component: OrderDialogComponent;
    let fixture: ComponentFixture<OrderDialogComponent>;
    let authenticationService: AuthenticationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          OrderDialogComponent
        ],
        imports: [
          HttpClientTestingModule,
          CommonsModule
        ].concat(
          basicAngularImports,
          materialImports
          ),
        providers: [
          FormBuilder,
          { provide: MAT_DIALOG_DATA, useValue: delivery }
        ]
      })
      .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(OrderDialogComponent);
      component = fixture.componentInstance;
      authenticationService = fixture.debugElement.injector.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
      const authenticationServiceMock = new AuthenticationServiceMock();
      authenticationServiceMock.mockAuthenticationService(authenticationService);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });


});
