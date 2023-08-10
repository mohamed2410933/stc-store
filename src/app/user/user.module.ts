import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductDetailsComponent } from './categories/product-details/product-details.component';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './categories/products/products.component';


@NgModule({
  declarations: [
    UserComponent,
    CategoriesComponent,
    ProductDetailsComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AngularMaterialModule,
    FormsModule,
    SharedModule
  ],
})
export class UserModule { }
