import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCreationComponent } from './delivery-creation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { Slaughter } from 'src/app/commons/models/slaughter.model';

describe('DeliveryCreationComponent', () => {
  let component: DeliveryCreationComponent;
  let fixture: ComponentFixture<DeliveryCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryCreationComponent ],
      imports: [HttpClientTestingModule],
      providers: [FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCreationComponent);
    component = fixture.componentInstance;
    component.slaughter = new Slaughter();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
