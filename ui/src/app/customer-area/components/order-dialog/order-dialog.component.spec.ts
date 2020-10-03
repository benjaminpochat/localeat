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
  product.price = 13.5;
  product.animal = animal;
  const delivery = new Delivery();
  delivery.availableProducts = [product];
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

      const orderDialog: HTMLElement = fixture.debugElement.nativeElement;
      const activeStepLabel = orderDialog.getElementsByClassName('mat-step-label mat-step-label-active mat-step-label-selected')[0];
      expect(activeStepLabel.textContent).toEqual('Sélectionnez la quantité de viande commandée (en kg)');
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
      const actor = new Actor();
      actor.email = 'louis.lachenal@montblanc.fr';
      actor.name = 'Lachenal';
      actor.firstName = 'Louis';
      actor.phoneNumber = '01 23 45 67 89';
      const account = new Account();
      account.id = 1;
      account.username = 'louis.lachenal';
      account.actor = actor;
      const authentication = new Authentication();
      authentication.authorities = ['CUSTOMER'];
      authentication.account = account;
      authenticationService.authentication.next(authentication);
      authenticationService.getAuthenticationFromCookie = () => authentication;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();

      const orderDialog: HTMLElement = fixture.debugElement.nativeElement;
      const activeStepLabel = orderDialog.getElementsByClassName('mat-step-label mat-step-label-active mat-step-label-selected')[0];
      expect(activeStepLabel.textContent).toEqual('Sélectionnez la quantité de viande commandée (en kg)');
      //expect(activeStepLabel.textContent).toEqual('Votre commande est au nom de Louis Lachenal');

    });
  });


});
