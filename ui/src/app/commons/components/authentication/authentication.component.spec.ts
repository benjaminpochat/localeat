import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationComponent } from './authentication.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthenticationComponent', () => {
  let authenticationComponent: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;
  let httpMock: HttpTestingController;

  describe(' with HttpClient mocked ', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ AuthenticationComponent ],
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [AuthenticationService, FormBuilder]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AuthenticationComponent);
      authenticationComponent = fixture.componentInstance;
      httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
      fixture.detectChanges();
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should create', () => {
      expect(authenticationComponent).toBeTruthy();
    });
  });
});
