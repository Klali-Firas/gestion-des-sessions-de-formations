import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { candidatAuthGuard } from './candidat-auth.guard';

describe('candidatAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => candidatAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
