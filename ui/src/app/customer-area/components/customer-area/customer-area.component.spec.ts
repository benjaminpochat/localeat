import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { AuthenticationServiceMock } from 'src/app/commons/services/authentication.service.mock';

import { CustomerAreaComponent } from './customer-area.component';

describe('CustomerAreaComponent', () => {
  let component: CustomerAreaComponent;
  let fixture: ComponentFixture<CustomerAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAreaComponent ],
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAreaComponent);
    component = fixture.componentInstance;
    let authenticationService = fixture.debugElement.injector.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    const authenticationServiceMock = new AuthenticationServiceMock();
    authenticationServiceMock.mockAuthenticationServiceMock(authenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
