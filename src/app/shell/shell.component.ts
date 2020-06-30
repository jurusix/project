import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../core/auth/auth.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html'
})
export class AppShellComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    public loader: LoadingBarService,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: object,
    private appService: AppService) {
    if (isPlatformBrowser(this.platformId)) {
      const path = localStorage.getItem('navigate-path-workaround');
      const user = sessionStorage.getItem('user');

      if (path) {
        localStorage.removeItem('path');
        this.router.navigate([path]);
      }

      if (user) {
        this.authService.user = JSON.parse(user);
      }
    }
  }

  logout(): void {
    this.authService.logout().then(
      () => this.router.navigate(['/login']),
      err => this.snackBar.open(err, '', { duration: 8000 })
    );
  }

  prepareRoute(outlet: RouterOutlet): void {
    return outlet?.activatedRouteData?.animation;
  }
}
