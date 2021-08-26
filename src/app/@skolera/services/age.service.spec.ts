import { TestBed } from '@angular/core/testing';

import { AgeService } from './age.service';

describe('AgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgeService = TestBed.get(AgeService);
    expect(service).toBeTruthy();
  });
});
