import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { SocialLogin } from '../core/enums/social-login';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  type = SocialLogin;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  login(type: SocialLogin) {

    this.authService.login(type).then(
      () => {
        const redirectUrl = this.authService.redirectUrl || '/dashboard';

        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        this.router.navigate([redirectUrl], navigationExtras);
      },
      error => this.snackBar.open(error, '', { duration: 8000 })
    );
  }
}
