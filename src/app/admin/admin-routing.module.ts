import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProducOperationstComponent } from './product-operations/product-operations.component';
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
                path: 'product-operations',
                component: ProducOperationstComponent,
            },
            {
                path: 'product-operations/:id',
                component: ProducOperationstComponent,
            },
        ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
