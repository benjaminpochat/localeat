import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Authentication } from 'src/app/commons/models/authentication.model';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthenticationService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAuthenticationFromCookie decode the json web token correctly', async () => {
    // given
    document.cookie = 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZWxldmV1ciIsImF1dGhvcml0aWVzIjpbIkJSRUVERVIiXSwiYWNjb3VudCI6eyJpZCI6IjEiLCJhY3RvciI6eyJuYW1lIjoiREFMSU4iLCJmaXJzdE5hbWUiOiJDaGFybGllIn19fQ.gQhlzTzxmesl3kRyryy90xu1rEEG71vwR64J_bursTo; Max-Age=3600; Expires=Mon, 29-Jun-2020 20:39:40 GMT';

    // when
    const authentication: Authentication = service.getAuthenticationFromCookie();

    // then
    expect(authentication.name).toBe('eleveur');
    expect(authentication.authorities).toEqual(['BREEDER']);
  });

  afterEach(() => {
    //service.deleteAuthentication();
  });
});
