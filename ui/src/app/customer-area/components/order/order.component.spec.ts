import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';

import { OrderComponent } from './order.component';
import { environment } from 'src/environments/environment';
import { UrlService } from 'src/app/commons/services/url.service';

describe('OrderComponent', () => {
  let orderComponent: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let urlService: UrlService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderComponent ],
      imports: [HttpClientTestingModule, MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    orderComponent = fixture.componentInstance;
    mockOrder();
    urlService = fixture.debugElement.injector.get<UrlService>(UrlService as Type<UrlService>);
    spyOn(urlService, 'getAuthenticatedUrl').and.returnValue(environment.localeatCoreUrl + '/accounts/1/orders');
    fixture.detectChanges();
  });

  function mockOrder(): void {
    orderComponent.order = {
      id: 1,
      customer: undefined,
      orderedItems: [],
      totalNetWeight: 0,
      totalPrice: 0,
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
    expect(orderComponent).toBeTruthy();
  });

});
