import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ProductTemplateService } from './product-template.service';

describe('ProductTemplateService', () => {
  let service: ProductTemplateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
