import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from 'src/app/customer-area/components/product/product.component';

describe('ProductComponent', () => {
  let productComponent: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    productComponent = fixture.componentInstance;
    mockProduct();
    fixture.detectChanges();
  });

  function mockProduct(){
    productComponent.product = {
      id: 1,
      name: 'colis \'tutti frutti\'',
      description: 'un assortiment de steaks, de rotis, et de morceaux a bouillir',
      unitPrice: 13.5,
      netWeight: 10,
      photo: null,
      farm: null
    };
  }

  it('should create', () => {
    expect(productComponent).toBeTruthy();
  });
});
