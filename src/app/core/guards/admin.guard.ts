import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';
import { IUser } from '../../layouts/dashboard/pages/users/models';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return authService.authUser$.pipe(
    map((authUser) => authUser?.role.name !== 'admin' ? router.createUrlTree(['dashboard', 'home']) : true));
};
