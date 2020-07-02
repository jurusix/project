
import { NgModule } from '@angular/core';
import { AppShellComponent } from './shell/shell.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppShellComponent,
    DashboardComponent,
    LoginComponent,
    SettingsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    RouterModule
  ],
  bootstrap: [AppShellComponent]
})
export class AppModule { }
