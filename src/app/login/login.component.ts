import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  private subs = new Subscription();

  constructor(
    public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.subs.add(
      this.authService.isAuthenticated$.subscribe(
        isAuthenticated => isAuthenticated && this.router.navigate(['dashboard'])
      )
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
