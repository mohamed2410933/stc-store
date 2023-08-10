import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  //#region Public Variables
    public userName: string = "";
    public password: string = "";
    public loginType: string ="";
    public activeButton: string = 'admin';
//#endregion
 
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sharedService: SharedService,

    ) { }
//=============================================================================================
  loginAsAdmin(): void {
    if (this.userName === 'admin' && this.password === 'admin') {
      localStorage.setItem('userRole' , 'admin')
      this.toastr.success('Admin successfully logged in')
      this.router.navigate(['/admin']);
    } else {
      this.toastr.error('Invalid user username or password')
    }
  }
//=============================================================================================
  loginAsUser(): void {
    if (this.userName === 'user' && this.password === 'user') {
        localStorage.setItem('userRole' , 'user')
        this.toastr.success('User successfully logged in')
        this.router.navigate(['/user']);
    } else {
        this.toastr.error('Invalid user username or password')
    }
  }
//=============================================================================================
  loginAs(role: string) {
    this.activeButton = role;
    localStorage.setItem('loginType' , role)
  }
//=============================================================================================
  login(){
    this.activeButton == 'user' ? this.loginAsUser() : this.loginAsAdmin();
  }
}
