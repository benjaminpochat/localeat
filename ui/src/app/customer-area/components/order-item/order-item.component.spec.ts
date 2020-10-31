import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemComponent } from './order-item.component';

describe('OrderItemComponent', () => {
  let orderItemComponent: OrderItemComponent;
  let fixture: ComponentFixture<OrderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemComponent);
    orderItemComponent = fixture.componentInstance;
    mockOrderItem();
    fixture.detectChanges();
  });

  function mockOrderItem(): void {
    orderItemComponent.orderItem = {
      quantity: 1,
      unitPrice: 13,
      product: {
        name: 'colis \'tutti frutti\'',
        description: 'un assortiment de steaks, de rotis, et de morceaux a bouillir',
        unitPrice: 13.5,
        quantity: 10,
        photo: null,
        farm: null
      }
    };
  }

  it('should create', () => {
    expect(orderItemComponent).toBeTruthy();
  });
});
