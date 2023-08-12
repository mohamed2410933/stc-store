import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductDetailsComponent } from './categories/product-details/product-details.component';

const routes: Routes =
  [
    {
      path: '',
      component: UserComponent,
      children: [
        {
          path: '',
          redirectTo: "categories",
          pathMatch: 'full',
        },
        {
          path: 'categories',
          component: CategoriesComponent,
        },
        {
          path: 'product-details/:id',
          component: ProductDetailsComponent,
        },
      ],
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
