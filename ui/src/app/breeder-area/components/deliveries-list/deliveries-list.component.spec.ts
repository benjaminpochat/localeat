import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesListComponent } from './deliveries-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UrlService } from 'src/app/commons/services/url.service';

import { Type } from '@angular/core';
import { UrlServiceTestUtils } from 'src/app/commons/services/url.service.test-utils';

describe('DeliveriesListComponent', () => {
  let deliveriesListComponent: DeliveriesListComponent;
  let fixture: ComponentFixture<DeliveriesListComponent>;
  let urlService: UrlService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveriesListComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveriesListComponent);
    deliveriesListComponent = fixture.componentInstance;
    mockDeliveries();
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    urlService = fixture.debugElement.injector.get<UrlService>(UrlService as Type<UrlService>);
    UrlServiceTestUtils.mockUrlService(urlService);
    fixture.detectChanges();
  });

  function mockDeliveries(): void {
    deliveriesListComponent.deliveries = [{
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
        product: {
          name: 'colis \'tutti frutti\'',
          description: 'un assortiment de steaks, de rotis, et de morceaux a bouillir',
          unitPrice: 13.5,
          quantity: 10,
          photo: null,
          farm: null
        },
        animal: {
          liveWeight: 850.0,
          meatWeight: 400.0,
          finalFarm: {
            name: 'La ferme de la Riviere',
            description: 'La ferme de la Riviere est un elevage d\'excellence'
          }
        },
        quantity: 10,
        unitPrice: 12.0
      }],
      orders: []
    }];
  }

  it('should create', () => {
    expect(deliveriesListComponent).toBeTruthy();
  });
});
