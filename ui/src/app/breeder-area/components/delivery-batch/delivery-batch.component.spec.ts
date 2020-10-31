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
    };
  }

  it('should create', () => {
    expect(deliveryBatchComponent).toBeTruthy();
  });
});
