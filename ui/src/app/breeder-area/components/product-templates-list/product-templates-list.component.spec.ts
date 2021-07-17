import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UrlService } from 'src/app/commons/services/url.service';
import { environment } from 'src/environments/environment';

import { ProductTemplatesListComponent } from './product-templates-list.component';

describe('ProductTemplatesLisComponent', () => {
  let productTemplatesListComponent: ProductTemplatesListComponent;
  let fixture: ComponentFixture<ProductTemplatesListComponent>;
  let httpMock: HttpTestingController;
  let urlService: UrlService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTemplatesListComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTemplatesListComponent);
    productTemplatesListComponent = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    urlService = fixture.debugElement.injector.get<UrlService>(UrlService as Type<UrlService>);
    jest.spyOn(urlService, 'getAuthenticatedUrl').mockImplementation(() => 'http://localhost:8080/accounts/1/products');
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('should create', () => {
    const request = httpMock.expectOne('http://localhost:8080/accounts/1/products');
    expect(request.request.method).toEqual('GET');

    request.flush({data: [{id: 1}, {id: 2}]});
    expect(productTemplatesListComponent).toBeTruthy();

    const requestGetConfiguration = httpMock.expectOne('/assets/config/config.json');
    expect(requestGetConfiguration.request.method).toEqual('GET');
  });
});
