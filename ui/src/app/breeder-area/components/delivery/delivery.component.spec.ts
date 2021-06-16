import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { UrlService } from 'src/app/commons/services/url.service';
import { environment } from 'src/environments/environment';

import { DeliveryComponent } from './delivery.component';

describe('DeliveryComponent', () => {
  let deliveryComponent: DeliveryComponent;
  let fixture: ComponentFixture<DeliveryComponent>;
  let httpMock: HttpTestingController;
  let urlService: UrlService;

  describe(' with HttpClient mocked ', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        declarations: [ DeliveryComponent ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DeliveryComponent);
      deliveryComponent = fixture.componentInstance;
      deliveryComponent.slaughter = new Slaughter();
      deliveryComponent.slaughter.delivery = {
        id: 1,
        deliveryAddress: {
          name: 'Chez Bob',
          city: 'Atlantic',
          zipCode: '10000',
          addressLine1: '2 rue des pommier',
          addressLine2: null,
          addressLine3: null,
          addressLine4: null
        },
        deliveryStart: new Date('2020-01-01T20:00:00'),
        deliveryEnd: new Date('2020-01-01T18:00:00'),
        availableBatches: [{
          id: 1,
          product: {
            id: 1,
            name: 'colis \'tutti frutti\'',
            description: 'un assortiment de steaks, de rotis, et de morceaux a bouillir',
            unitPrice: 13.5,
            netWeight: 10,
            photo: null,
            farm: null
          },
          quantity: 10,
          quantitySold: 0
        }],
        orders: []
      };
      httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
      urlService = fixture.debugElement.injector.get<UrlService>(UrlService as Type<UrlService>);
      jest.spyOn(urlService, 'getAuthenticatedUrl').mockImplementation(
        () => environment.localeatCoreUrl + '/accounts/1/deliveries/1/orders');
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
      expect(deliveryComponent).toBeTruthy();
    });
  });
});
