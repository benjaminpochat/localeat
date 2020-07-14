import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaughtersListComponent } from './slaughters-list.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { SlaughterService } from '../../services/slaughter.service';
import { Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { environment } from 'src/environments/environment';


describe('SlaughtersListComponent', () => {
  let slaughtersListComponent: SlaughtersListComponent;
  let fixture: ComponentFixture<SlaughtersListComponent>;
  let httpMock: HttpTestingController;

  describe(' with HttpClient mocked ', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ SlaughtersListComponent ],
        imports: [HttpClientTestingModule],
        providers: [SlaughterService, FormBuilder]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SlaughtersListComponent);
      slaughtersListComponent = fixture.componentInstance;
      httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
      fixture.detectChanges();
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should create', () => {
      const request = httpMock.expectOne(environment.localeatCoreUrl + '/slaughters');
      expect(request.request.method).toEqual('GET');
      request.flush({data: [{id: 1}, {id: 2}]});

      expect(slaughtersListComponent).toBeTruthy();
    });
  });
});
