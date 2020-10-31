import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaughtersListComponent } from './slaughters-list.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { SlaughterService } from '../../services/slaughter.service';
import { Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { UrlService } from 'src/app/commons/services/url.service';

describe('SlaughtersListComponent', () => {
  let slaughtersListComponent: SlaughtersListComponent;
  let fixture: ComponentFixture<SlaughtersListComponent>;

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
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(slaughtersListComponent).toBeTruthy();
    });
  });
});
