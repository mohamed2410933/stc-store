import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const USER_ROLE = 'user';
const ADMIN_ROLE = 'admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}
//==============================================================================================
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
//==============================================================================================
  login() {
    const userName = this.loginForm.value.userName;
    const password = this.loginForm.value.password;

    if (this.validateUser(userName, password, USER_ROLE)) {
      localStorage.setItem('userRole', USER_ROLE);
      this.toastrService.success('User successfully logged in');
      this.router.navigate(['/user']);
    } else if (this.validateUser(userName, password, ADMIN_ROLE)) {
      localStorage.setItem('userRole', ADMIN_ROLE);
      this.toastrService.success('Admin successfully logged in');
      this.router.navigate(['/admin']);
    } else {
      this.toastrService.error('Invalid username or password');
    }
  }
//==============================================================================================
  private validateUser(userName: string, password: string, role: string): boolean {
    return userName === role && password === role;
  }
}
