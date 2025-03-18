import { TestBed } from '@angular/core/testing';

import { GetStacksService } from './get-stacks.service';

describe('GetStacksService', () => {
  let service: GetStacksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetStacksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
