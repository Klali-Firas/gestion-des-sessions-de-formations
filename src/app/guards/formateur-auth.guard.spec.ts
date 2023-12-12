import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { formateurAuthGuard } from './formateur-auth.guard';

describe('formateurAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => formateurAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
