import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccessGuard implements CanLoad {
  constructor(private authService: AuthService) {} 

  canLoad(): boolean {
    return this.authService.isUser(); 
  }
}
