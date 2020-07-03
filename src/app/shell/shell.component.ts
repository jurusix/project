import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../core/auth/auth.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppService } from '../app.service';
import { ThemeMode } from '../core/enums/theme-mode';


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

  isAuthenticated: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    public loader: LoadingBarService,
    private router: Router,
    private appService: AppService) {
    this.isAuthenticated = authService.isAuthenticated$;

    const theme = localStorage.getItem('theme-name') as ThemeMode || ThemeMode.Default;
    const navigatePath = localStorage.getItem('navigate-path-workaround');
    const callbackPath = localStorage.getItem('callback-path-workaround');

    this.appService.setTheme(theme);

    if (navigatePath) {
      localStorage.removeItem('path');
      this.router.navigate([navigatePath]);
    }

    if (callbackPath) {
      localStorage.removeItem('callback-path-workaround');
      this.router.navigateByUrl(callbackPath);
    }

    this.authService.runInitialLoginSequence();
  }

  logout(): void { this.authService.logout(); }

  prepareRoute(outlet: RouterOutlet): void {
    return outlet?.activatedRouteData?.animation;
  }

  get name(): string | undefined {
    return this.authService.identityClaims
      ? this.authService.identityClaims?.name : 'Anonymous';
  }
}
