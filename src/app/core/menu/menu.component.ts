import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit ,  OnDestroy {
  //#region  Public Variables
      public logedInStatus:boolean=false
      public subscreption:any
  //#endregion
  constructor( private router: Router , private sharedService:SharedService,activatedRoute: ActivatedRoute){}
//=========================================================================================
ngOnInit(): void {
  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.logedInStatus = !event.url.includes('login');
    }
  });
}
//=========================================================================================
  logOut(){
    this.logedInStatus =false;
    localStorage.clear();
     this.router.navigate(['/login'])
  }
//=========================================================================================
  ngOnDestroy(): void {
    this.subscreption.unsubscribe();
  }
//=========================================================================================
}
