import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreederAreaComponent } from './breeder-area.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { Type } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

describe('BreederAreaComponent', () => {
  let breederAreaComponent: BreederAreaComponent;
  let fixture: ComponentFixture<BreederAreaComponent>;
  let httpMock: HttpTestingController;
  let router: Router;
  let authenticationService: AuthenticationService;

  describe(' with HttpClient mocked ', () => {

    beforeEach(async () => {
      TestBed.configureTestingModule({
        declarations: [ BreederAreaComponent ],
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [AuthenticationService]
      });
      await TestBed.compileComponents();

      fixture = TestBed.createComponent(BreederAreaComponent);
      router = TestBed.inject(Router);
      breederAreaComponent = fixture.componentInstance;
      authenticationService = TestBed.inject(AuthenticationService);
      httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
      fixture.detectChanges();
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should create', () => {
      expect(breederAreaComponent).toBeTruthy();
    });
  });
});
