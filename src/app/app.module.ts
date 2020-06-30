
import { NgModule } from '@angular/core';
import { AppShellComponent } from './shell/shell.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { environment } from '../environments/environment';
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
    SocialLoginModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    AppRoutingModule,
    CoreModule,
    RouterModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleLoginProvider),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebookLoginProvider),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppShellComponent]
})
export class AppModule { }
