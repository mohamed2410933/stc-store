import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { AngularMaterialModule } from '../angular-material.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    CoreComponent,
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    AngularMaterialModule,
    NgxSpinnerModule,
  ],
  exports: [
    MenuComponent,
    FooterComponent,
    NgxSpinnerModule,

  ]
})
export class CoreModule { }