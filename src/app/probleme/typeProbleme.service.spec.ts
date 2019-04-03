import { TestBed } from '@angular/core/testing';

import { typeProblemeService } from './typeProbleme.service';

describe('typeProblemeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: typeProblemeService = TestBed.get(typeProblemeService);
    expect(service).toBeTruthy();
  });
});
