import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UrlService } from 'src/app/commons/services/url.service';
import { environment } from 'src/environments/environment';

import { ProductsListComponent } from './products-list.component';

describe('ProductLisComponent', () => {
  let productListComponent: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let httpMock: HttpTestingController;
  let urlService: UrlService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsListComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    productListComponent = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    urlService = fixture.debugElement.injector.get<UrlService>(UrlService as Type<UrlService>);
    spyOn(urlService, 'getAuthenticatedUrl').and.returnValue(environment.localeatCoreUrl + '/accounts/1/products');
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    const request = httpMock.expectOne(environment.localeatCoreUrl + '/accounts/1/products');
    expect(request.request.method).toEqual('GET');
    request.flush({data: [{id: 1}, {id: 2}]});
    expect(productListComponent).toBeTruthy();
  });
});
