import { TestBed } from '@angular/core/testing';

import { SlaughterService } from './slaughter.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('SlaughterService', () => {
  let service: SlaughterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SlaughterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
