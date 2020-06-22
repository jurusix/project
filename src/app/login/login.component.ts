import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { SocialLogin } from '../enum/social-login';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
