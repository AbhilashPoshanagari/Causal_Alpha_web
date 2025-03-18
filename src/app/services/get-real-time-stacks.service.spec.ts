import { TestBed } from '@angular/core/testing';

import { GetRealTimeStacksService } from './get-real-time-stacks.service';

describe('GetRealTimeStacksService', () => {
  let service: GetRealTimeStacksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRealTimeStacksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
