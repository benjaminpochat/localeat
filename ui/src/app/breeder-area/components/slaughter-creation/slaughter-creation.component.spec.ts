import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaughterCreationComponent } from './slaughter-creation.component';

describe('SlaughterCreationComponent', () => {
  let component: SlaughterCreationComponent;
  let fixture: ComponentFixture<SlaughterCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlaughterCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaughterCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
