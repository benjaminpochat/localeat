import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreederAreaComponent } from './breeder-area.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CommonsModule } from 'src/app/commons/commons.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('BreederAreaComponent', () => {
  let breederAreaComponent: BreederAreaComponent;
  let fixture: ComponentFixture<BreederAreaComponent>;
  let httpMock: HttpTestingController;
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

    it('should show login form if the user is not authenticated', () => {
      //given
      spyOn(authenticationService, 'isAuthenticated').and.returnValue(false);
      spyOn(authenticationService, 'isAuthorized').withArgs('BREEDER').and.returnValue(false);

      //when
      fixture.detectChanges();

      //then
      expect(fixture.debugElement.query(By.css('#authentication-form')).nativeElement.hidden).toBeFalsy();
      expect(fixture.debugElement.query(By.css('#slaughters-list')).nativeElement.hidden).toBeTruthy();
      expect(fixture.debugElement.query(By.css('#forbiden-zone-message')).nativeElement.hidden).toBeTruthy();
    });

    it('should show slaughter list if the user is authenticated with breeder authorization', () => {
      //given
      spyOn(authenticationService, 'isAuthenticated').and.returnValue(true);
      spyOn(authenticationService, 'isAuthorized').withArgs('BREEDER').and.returnValue(true);

      //when
      fixture.detectChanges();

      //then
      expect(fixture.debugElement.query(By.css('#authentication-form')).nativeElement.hidden).toBeTruthy();
      expect(fixture.debugElement.query(By.css('#slaughters-list')).nativeElement.hidden).toBeFalsy();
      expect(fixture.debugElement.query(By.css('#forbiden-zone-message')).nativeElement.hidden).toBeTruthy();
    });

    it('should show forbiden alert if the user is authenticated without breeder authorization', () => {
      //given
      spyOn(authenticationService, 'isAuthenticated').and.returnValue(true);
      spyOn(authenticationService, 'isAuthorized').withArgs('BREEDER').and.returnValue(false);

      //when
      fixture.detectChanges();

      //then
      expect(fixture.debugElement.query(By.css('#authentication-form')).nativeElement.hidden).toBeTruthy();
      expect(fixture.debugElement.query(By.css('#slaughters-list')).nativeElement.hidden).toBeTruthy();
      expect(fixture.debugElement.query(By.css('#forbiden-zone-message')).nativeElement.hidden).toBeFalsy();
    });
  });
});
