import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    // Add your logic to check if the user is logged in as an admin (Admin role)
    // For example, you can use a service to check the user role from authentication state.
    const isLoggedInAsAdmin = true; // Replace this with your actual authentication check.

    if (isLoggedInAsAdmin) {
      return true;
    } else {
      // If the user is not logged in, navigate to the login page.
      return this.router.parseUrl('/login');
    }
  }
}
