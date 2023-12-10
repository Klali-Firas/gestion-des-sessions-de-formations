import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const candidatAuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  if (sessionStorage.getItem('accessToken')) {
    return true;
  }
  router.navigate(['/'])
  return false
};
