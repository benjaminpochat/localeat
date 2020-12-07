import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryComponent } from './delivery.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('DeliveryComponent', () => {
  let deliveryComponent: DeliveryComponent;
  let fixture: ComponentFixture<DeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryComponent ],
      imports: [HttpClientTestingModule, MatDialogModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryComponent);
    deliveryComponent = fixture.componentInstance;
    mockDelivery();
    fixture.detectChanges();
  });

  function mockDelivery(): void {
    deliveryComponent.delivery = {
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
  }

  it('should create', () => {
    expect(deliveryComponent).toBeTruthy();
  });
});
