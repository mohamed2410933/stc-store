import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: string | null = null; 
//=================================================================================
  constructor() {
    this.loadUserRole();
  }
//=================================================================================
  private loadUserRole() {
    this.userRole = localStorage.getItem('userRole');
  }
//=================================================================================
  setUserRole(role: string) {
    this.userRole = role;
  }
//=================================================================================
  getUserRole(): string | null {
    return this.userRole;
  }
//=================================================================================
  isUser(): boolean {
    this.loadUserRole();
    return this.userRole === 'user';
  }
//=================================================================================
  isAdmin(): boolean {
    this.loadUserRole();
    return this.userRole === 'admin';
  }


}
