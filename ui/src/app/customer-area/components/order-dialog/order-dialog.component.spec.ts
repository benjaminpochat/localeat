import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDialogComponent } from './order-dialog.component';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { Type } from '@angular/core';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { Authentication } from 'src/app/commons/models/authentication.model';
import { Account } from 'src/app/commons/models/account.model';
import { Actor } from 'src/app/commons/models/actor.model';

describe('OrderDialogComponent', () => {

  describe('with no authentication', () => {
    let component: OrderDialogComponent;
    let fixture: ComponentFixture<OrderDialogComponent>;
    let authenticationService: AuthenticationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ OrderDialogComponent ],
        imports: [ HttpClientTestingModule, MatDialogModule ],
        providers: [ FormBuilder ]
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
        declarations: [ OrderDialogComponent ],
        imports: [ HttpClientTestingModule, MatDialogModule ],
        providers: [ FormBuilder ]
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
    });
  });


});
