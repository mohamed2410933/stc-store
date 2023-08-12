import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const isLoggedInAsUser = true; 
    if (isLoggedInAsUser) {
      return true;
    } else {
      // If the user is not logged in, navigate to the login page.
      return this.router.parseUrl('/login');
    }
  }
}
