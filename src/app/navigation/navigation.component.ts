import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { SocialUser } from 'angularx-social-login';
import { SocialAuthService } from 'angularx-social-login';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  user: SocialUser;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private socAuthService: SocialAuthService,
    public loader: LoadingBarService,
    private router: Router) {
    const path = localStorage.getItem('navigate-path-workaround');

    if (path) {
      localStorage.removeItem('path');
      this.router.navigate([path]);
    }
  }

  ngOnInit() {
    this.socAuthService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
  }
}
