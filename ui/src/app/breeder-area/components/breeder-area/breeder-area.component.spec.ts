import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreederAreaComponent } from './breeder-area.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { Type } from '@angular/core';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/commons/services/url.service';
import { UrlServiceTestUtils } from 'src/app/commons/services/url.service.test-utils';

describe('BreederAreaComponent', () => {
  let breederAreaComponent: BreederAreaComponent;
  let fixture: ComponentFixture<BreederAreaComponent>;
  let httpMock: HttpTestingController;
  let router: Router;
  let authenticationService: AuthenticationService;
  let urlService: UrlService;

  describe(' with HttpClient mocked ', () => {

    beforeEach(async () => {
      TestBed.configureTestingModule({
        declarations: [ BreederAreaComponent ],
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [AuthenticationService]
      });
      await TestBed.compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BreederAreaComponent);
      router = TestBed.inject(Router);
      breederAreaComponent = fixture.componentInstance;
      authenticationService = TestBed.inject(AuthenticationService);
      httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
      urlService = fixture.debugElement.injector.get<UrlService>(UrlService as Type<UrlService>);
      UrlServiceTestUtils.mockUrlService(urlService);
      fixture.detectChanges();
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should create', () => {
      const requestGetDeliveries = httpMock.expectOne('http://localhost:8080/accounts/1/deliveries');
      expect(requestGetDeliveries.request.method).toEqual('GET');

      const requestGetSlaughters = httpMock.expectOne('http://localhost:8080/accounts/1/slaughters');
      expect(requestGetSlaughters.request.method).toEqual('GET');

      const requestGetConfiguration = httpMock.expectOne('/assets/config/config.json');
      expect(requestGetConfiguration.request.method).toEqual('GET');

      expect(breederAreaComponent).toBeTruthy();
    });
  });
});


