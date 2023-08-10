import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
// import { AuthService } from './auth.service'; // Adjust import as needed

@Injectable({
  providedIn: 'root'
})
export class AdminAccessGuard implements CanLoad {
  constructor(private authService: AuthService) {} // Adjust service dependency

  canLoad(): boolean {
    return this.authService.isAdmin(); // Implement isAdmin() method in AuthService
  }
}
