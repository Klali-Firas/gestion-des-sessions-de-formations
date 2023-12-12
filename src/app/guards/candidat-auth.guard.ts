import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Candidat } from '../interfaces/candidat';

export const candidatAuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const user = JSON.parse(sessionStorage.getItem('user')!);
  if (sessionStorage.getItem('accessToken')) {
    if (user && user.type && user.type == "candidat") { return true; }
  }
  router.navigate(['/'])
  return false
};
