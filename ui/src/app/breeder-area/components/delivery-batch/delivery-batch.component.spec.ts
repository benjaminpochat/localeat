import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryBatchComponent } from './delivery-batch.component';

describe('DeliveryBatchComponent', () => {
  let deliveryBatchComponent: DeliveryBatchComponent;
  let fixture: ComponentFixture<DeliveryBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBatchComponent);
    deliveryBatchComponent = fixture.componentInstance;
    mockBatch();
    fixture.detectChanges();
  });

  function mockBatch(){
    deliveryBatchComponent.batch = {
      id: 1,
      product: {
        id: 1,
        name: 'colis \'tutti frutti\'',
        description: 'un assortiment de steaks, de rotis, et de morceaux a bouillir',
        unitPrice: 13.5,
        netWeight: 10,
        photo: null,
        farm: null,
        elements: null
      },
      quantity: 10,
      quantitySold: 0
    };
  }

  it('should create', () => {
    expect(deliveryBatchComponent).toBeTruthy();
  });
});
