import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import { AuthService } from './auth.service'; // Adjust import as needed

@Injectable({
  providedIn: 'root'
})
export class AdminAccessGuard implements CanLoad {
  constructor(private authService: AuthService) {} 
//===========================================================================================
  canLoad(): boolean {
    return this.authService.isAdmin();
  }
}
