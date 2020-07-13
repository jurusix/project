import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    const status = await this.authService.isAuthenticated$;
    if (status) {
      this.router.navigate(['dashboard']);
    }
  }
}
