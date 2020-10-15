import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { UrlService } from 'src/app/commons/services/url.service';
import { environment } from 'src/environments/environment';

import { DeliveryOrdersTableComponent } from './delivery-orders-table.component';

describe('DeliveryOrdersTableComponent', () => {
  let deliveryOrdersTableComponent: DeliveryOrdersTableComponent;
  let fixture: ComponentFixture<DeliveryOrdersTableComponent>;
  let httpMock: HttpTestingController;
  let urlService: UrlService;

  describe(' with HttpClient mocked ', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        declarations: [ DeliveryOrdersTableComponent ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DeliveryOrdersTableComponent);
      deliveryOrdersTableComponent = fixture.componentInstance;
      deliveryOrdersTableComponent.delivery = new Delivery();
      deliveryOrdersTableComponent.delivery.id = 1;
      httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
      urlService = fixture.debugElement.injector.get<UrlService>(UrlService as Type<UrlService>);
      spyOn(urlService, 'getAuthenticatedUrl').and.returnValue(environment.localeatCoreUrl + '/accounts/1/deliveries/1/orders');
      fixture.detectChanges();
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should create', () => {
      // given
      const request = httpMock.expectOne(environment.localeatCoreUrl + '/accounts/1/deliveries/1/orders');
      expect(request.request.method).toEqual('GET');
      request.flush({data: [{id: 1}, {id: 2}]});

      // when, then
      expect(deliveryOrdersTableComponent).toBeTruthy();
    });
  });
});
