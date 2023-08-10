import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ProductsComponent } from './products/products.component';
const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path:'',
                redirectTo:"products",
                pathMatch: 'full',
              },
            {
                path: 'products',
                component: ProductsComponent,
            },
            {
                path: 'add-edit-product',
                component: AddEditProductComponent,
            },
            {
                path: 'add-edit-product/:id',
                component: AddEditProductComponent,
            },
        ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
