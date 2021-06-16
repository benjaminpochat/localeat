import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaughterCreationComponent } from './slaughter-creation.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SlaughterService } from 'src/app/breeder-area/services/slaughter.service';
import { Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';

describe('SlaughterCreationComponent', () => {
  let slaughterCreationComponent: SlaughterCreationComponent;
  let fixture: ComponentFixture<SlaughterCreationComponent>;
  let httpMock: HttpTestingController;

  describe(' with HttpClient mocked ', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ SlaughterCreationComponent ],
        imports: [HttpClientTestingModule],
        providers: [SlaughterService, FormBuilder]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SlaughterCreationComponent);
      slaughterCreationComponent = fixture.componentInstance;
      httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
      fixture.detectChanges();
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should create', () => {
      expect(slaughterCreationComponent).toBeTruthy();
    });
  });
});
