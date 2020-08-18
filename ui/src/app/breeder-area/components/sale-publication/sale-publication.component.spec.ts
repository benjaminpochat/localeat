import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePublicationComponent } from './sale-publication.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { Slaughter } from 'src/app/commons/models/slaughter.model';

describe('SalePublicationComponent', () => {
  let component: SalePublicationComponent;
  let fixture: ComponentFixture<SalePublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalePublicationComponent ],
      imports: [HttpClientTestingModule],
      providers: [FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePublicationComponent);
    component = fixture.componentInstance;
    component.slaughter = new Slaughter();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
