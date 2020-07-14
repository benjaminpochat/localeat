import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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

  it('getAuthenticationFromCookie decode the json web token correcty', async () => {
    // given
    document.cookie = 'jwt=eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoiZWxldmV1ciIsImF1dGhvcml0aWVzIjpbIkJSRUVERVIiXX0.c0kRZNGLGoRrS8A3W5NxVmORGlJl6KNKghZLptxOZNOM3vrC6C5LHc4ff6psu6DUsGMYfBEUvDQEYChVS_KRkBpqaFUqu22g4BrDoDxlL1ZcjEgnWC-8UG0eACZ7IQ231LvwEOzt6OtsLClqOAsVfZFlKM5E0k70lrQlVjTTgqVc9FJ0mYNh5Nz-IugA-Fa-4BUx5NV5W6y3BzLd-LPZVysENY0u9VStMeFI8fnHEAA_XMkEdLXFnNV3dMGtHUaf5i2pBqiH0f_HKokK5-xIdMPmT0juMbr1aOWRwLtNrARNAkLNt3zc033htSoUhL2yD5NmribJbTzStxYByMeQbw; Max-Age=3600; Expires=Mon, 29-Jun-2020 20:39:40 GMT';
    // when
    const authentication = service.getAuthenticationFromCookie();
    expect(authentication.name).toBe('eleveur');
    expect(authentication.authorities).toEqual(['BREEDER']);
  });
});
