import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSpinner } from '@angular/material/progress-spinner';

import { ImageGaleryComponent } from './image-galery.component';

describe('ImageGaleryComponent', () => {
  let component: ImageGaleryComponent;
  let fixture: ComponentFixture<ImageGaleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageGaleryComponent, MatSpinner ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
