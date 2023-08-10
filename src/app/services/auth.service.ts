import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: string | null = null; // Store user's role here, e.g., 'user' or 'admin'

  constructor(){
    this.userRole = localStorage.getItem('userRole')
  }


  
  setUserRole(role: string) {
    this.userRole = role;
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  isUser(): boolean {
    this.userRole = localStorage.getItem('userRole')

    return this.userRole === 'user';
  }

  
  isAdmin(): boolean {
    this.userRole = localStorage.getItem('userRole')

    return this.userRole === 'admin';
  }
  // Other methods and authentication logic
}
