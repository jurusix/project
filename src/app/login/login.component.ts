import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { SocialLogin } from '../core/enums/social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  type = SocialLogin;

  constructor(
    private authService: AuthService) { }

  login(): void { this.authService.login(); }
}
