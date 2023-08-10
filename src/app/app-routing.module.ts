import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { AdminAccessGuard } from './shared/guards/admin-access.guard';
import { UserAccessGuard } from './shared/guards/user-access.guard';

// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'core', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) },
//   { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
//   { path: '**', redirectTo: 'login' },
// ];
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AdminAccessGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canLoad: [UserAccessGuard]
  },
  { path: '**', redirectTo: 'login' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

