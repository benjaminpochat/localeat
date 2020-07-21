import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePublicationComponent } from './sale-publication.component';

describe('SalePublicationComponent', () => {
  let component: SalePublicationComponent;
  let fixture: ComponentFixture<SalePublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalePublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
