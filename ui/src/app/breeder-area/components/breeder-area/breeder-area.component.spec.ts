import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreederAreaComponent } from './breeder-area.component';

describe('BreederAreaComponent', () => {
  let component: BreederAreaComponent;
  let fixture: ComponentFixture<BreederAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreederAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreederAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
