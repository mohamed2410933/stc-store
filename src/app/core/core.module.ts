import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotFoundComponent } from './not-found/not-found.component';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [
    CoreComponent,
    MenuComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    NgxSpinnerModule,
    AngularMaterialModule
  ],
  exports: [
    MenuComponent,
    FooterComponent,
    NgxSpinnerModule,
  ]
})
export class CoreModule { }
