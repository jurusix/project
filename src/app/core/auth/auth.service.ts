import { Injectable } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { SocialLogin } from '../enums/social-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user: SocialUser;
  redirectUrl: string;

  constructor(private socAuthService: SocialAuthService) { }

  login(type: SocialLogin): Promise<SocialUser> {
    return new Promise((resolve, reject) => {

      const provider = this.getProvider(type);

      this.socAuthService.signIn(provider).then(
        user => {
          this.user = user;
          sessionStorage.setItem('user', JSON.stringify(user));
          resolve();
        },
        error => {
          this.user = null;
          console.error(error);
          const err = typeof error === 'object' ? error.error : error;
          reject(err);
        }
      );
    });
  }

  private getProvider(type: SocialLogin): string {
    let provider = '';
    switch (type) {
      case SocialLogin.Facebook:
        provider = FacebookLoginProvider.PROVIDER_ID;
        break;
      case SocialLogin.Google:
        provider = GoogleLoginProvider.PROVIDER_ID;
        break;
    }
    return provider;
  }

  logout(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.socAuthService.signOut().then(
        () => {
          this.user = null;
          sessionStorage.removeItem('user');
          resolve();
        },
        error => {
          const err = typeof error === 'object' ? error.error : error;
          reject(err);
        }
      );
    });
  }
}
