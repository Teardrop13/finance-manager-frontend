import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication/services/authentication.service';

export const authGuard = () => {
  const authentication = inject(AuthenticationService);
  const router = inject(Router);

  if (authentication.isAuthenticated()) {
    return true;
  }

  return router.parseUrl('/login');
};