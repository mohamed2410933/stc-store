import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AngularMaterialModule } from '../angular-material.module';

import {MatButtonModule} from '@angular/material/button';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminComponent,
    AddEditProductComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[AddEditProductComponent]
})
export class AdminModule { }
