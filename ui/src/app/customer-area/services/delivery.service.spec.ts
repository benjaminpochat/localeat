import { TestBed } from '@angular/core/testing';

import { DeliveryService } from './delivery.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DeliveryService', () => {
  let service: DeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
