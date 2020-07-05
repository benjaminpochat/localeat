import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaughtersListComponent } from './slaughters-list.component';

describe('SlaughtersListComponent', () => {
  let component: SlaughtersListComponent;
  let fixture: ComponentFixture<SlaughtersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlaughtersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaughtersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
