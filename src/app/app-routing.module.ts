import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth/auth.guard';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }, {
    path: 'oauth2callback',
    component: LoginComponent
  }, {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
