import { TestBed } from '@angular/core/testing';

import { CustomReuseService } from './custom-reuse.service';

describe('CustomReuseService', () => {
  let service: CustomReuseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomReuseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
