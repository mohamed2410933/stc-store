import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { AdminAccessGuard } from './shared/guards/admin-access.guard';
import { UserAccessGuard } from './shared/guards/user-access.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AdminAccessGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canLoad: [UserAccessGuard]
  },
  { path: 'not-found', component: NotFoundComponent }, // Route for Not Found Component
  { path: '**', redirectTo: 'not-found' } // Wildcard route to redirect to Not Found Component
  // { path: '**', redirectTo: 'login' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

