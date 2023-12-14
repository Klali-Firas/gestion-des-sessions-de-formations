import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const user = JSON.parse(sessionStorage.getItem('user')!);
  if (sessionStorage.getItem('accessToken')) {
    if (user && user.type && user.type == "admin") { return true; }
  }
  router.navigate(['/'])
  return false
};
