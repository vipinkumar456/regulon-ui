import { TestBed } from '@angular/core/testing';

import { Tranche3Service } from './tranche3.service';

describe('Tranche3Service', () => {
  let service: Tranche3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tranche3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
