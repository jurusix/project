import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthConfig, OAuthModule, OAuthModuleConfig, OAuthStorage } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { authModuleConfig } from './auth/auth-module-config';
import { googleAuthCodeFlowConfig } from './auth/google-auth-config';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';


export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  exports: [
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: AuthConfig, useValue: googleAuthCodeFlowConfig },
        { provide: OAuthModuleConfig, useValue: authModuleConfig },
        { provide: OAuthStorage, useFactory: storageFactory },
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
