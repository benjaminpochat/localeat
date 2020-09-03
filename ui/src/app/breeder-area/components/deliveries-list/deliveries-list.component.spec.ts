import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesListComponent } from './deliveries-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UrlService } from 'src/app/commons/services/url.service';

import { environment } from 'src/environments/environment';
import { Type } from '@angular/core';

describe('DeliveriesListComponent', () => {
  let component: DeliveriesListComponent;
  let fixture: ComponentFixture<DeliveriesListComponent>;
  let urlService: UrlService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveriesListComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveriesListComponent);
    component = fixture.componentInstance;
    urlService = fixture.debugElement.injector.get<UrlService>(UrlService as Type<UrlService>);
    spyOn(urlService, 'getAuthenticatedUrl').and.returnValue(environment.localeatCoreUrl + '/accounts/1/deliveries');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
