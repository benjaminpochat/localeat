import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuComponent } from './main-menu.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainMenuComponent', () => {
  let mainMenuComponent: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;
  let httpMock: HttpTestingController;

  describe(' with HttpClient mocked ', () => {

    beforeEach(async () => {
      TestBed.configureTestingModule({
        declarations: [ MainMenuComponent ],
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [AuthenticationService]
      });
      await TestBed.compileComponents();

      fixture = TestBed.createComponent(MainMenuComponent);
      mainMenuComponent = fixture.componentInstance;
      httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
      fixture.detectChanges();
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should create', () => {
      expect(mainMenuComponent).toBeTruthy();

      const requestGetConfiguration = httpMock.expectOne('/assets/config/config.json');
      expect(requestGetConfiguration.request.method).toEqual('GET');
    });
  });
});
