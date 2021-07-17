import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderStatus } from 'src/app/commons/models/order-status.model';
import { UrlService } from 'src/app/commons/services/url.service';

import { OrderDetailsComponent } from './order-details.component';

describe('OrderDetailsComponent', () => {
  let orderDetailsComponent: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;
  let urlService: UrlService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailsComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsComponent);
    orderDetailsComponent = fixture.componentInstance;
    mockOrder();
    urlService = fixture.debugElement.injector.get<UrlService>(UrlService as Type<UrlService>);
    jest.spyOn(urlService, 'getAuthenticatedUrl').mockImplementation(() => 'http://localhost:8080/accounts/1/orders');
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    fixture.detectChanges();
  });

  function mockOrder(): void {
    orderDetailsComponent.order = {
      id: 1,
      customer: undefined,
      orderedItems: [],
      totalNetWeight: 0,
      totalPrice: 0,
      status: OrderStatus.BOOKED,
      delivery: {
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
      }
    };
  }

  it('should create', () => {
    expect(orderDetailsComponent).toBeTruthy();

    const requestGetConfiguration = httpMock.expectOne('/assets/config/config.json');
    expect(requestGetConfiguration.request.method).toEqual('GET');
  });
});
