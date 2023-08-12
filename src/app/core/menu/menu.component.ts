import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  //#region  Public Variables
      public logedInStatus: boolean = false;
  //#endregion

  constructor(private router: Router) {}
//============================================================================================
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.logedInStatus = !event.url.includes('login');
      }
    });
  }
//============================================================================================
  logOut(): void {
    this.logedInStatus = false;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
//============================================================================================

}
