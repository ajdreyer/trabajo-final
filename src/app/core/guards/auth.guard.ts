import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('authguard');

  const router = inject(Router);
  const authService = inject(AuthService);

  const isAuth = authService.verifyToken();

  return isAuth || router.createUrlTree(['auth']);
};
