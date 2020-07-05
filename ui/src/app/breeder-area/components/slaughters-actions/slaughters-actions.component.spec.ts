import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaughtersActionsComponent } from './slaughters-actions.component';

describe('SlaughtersActionsComponent', () => {
  let component: SlaughtersActionsComponent;
  let fixture: ComponentFixture<SlaughtersActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlaughtersActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaughtersActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
