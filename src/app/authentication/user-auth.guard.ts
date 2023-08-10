import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    // Add your logic to check if the user is logged in as a regular user (User role)
    // For example, you can use a service to check the user role from authentication state.
    const isLoggedInAsUser = true; // Replace this with your actual authentication check.

    if (isLoggedInAsUser) {
      return true;
    } else {
      // If the user is not logged in, navigate to the login page.
      return this.router.parseUrl('/login');
    }
  }
}
