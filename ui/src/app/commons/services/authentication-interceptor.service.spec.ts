import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthenticationInterceptor } from './authentication-interceptor.service';

describe('AuthenticationInterceptorService', () => {
  let service: AuthenticationInterceptor;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();
    service = TestBed.inject(AuthenticationInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
