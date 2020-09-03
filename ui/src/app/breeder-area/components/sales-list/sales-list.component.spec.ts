import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesListComponent } from './sales-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UrlService } from 'src/app/commons/services/url.service';

import { environment } from 'src/environments/environment';
import { Type } from '@angular/core';

describe('SalesListComponent', () => {
  let component: SalesListComponent;
  let fixture: ComponentFixture<SalesListComponent>;
  let urlService: UrlService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesListComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesListComponent);
    component = fixture.componentInstance;
    urlService = fixture.debugElement.injector.get<UrlService>(UrlService as Type<UrlService>);
    spyOn(urlService, 'getAuthenticatedUrl').and.returnValue(environment.localeatCoreUrl + '/accounts/1/deliveries');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
