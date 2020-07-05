import { TestBed } from '@angular/core/testing';

import { SlaughterService } from './slaughter.service';

describe('SlaughterService', () => {
  let service: SlaughterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlaughterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
