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

    /* if (callbackPath) {
      this.clearAfterWorkaround();
      this.router.navigateByUrl(`/${navigatePath + callbackPath}`);
    } */

    if (navigatePath) {
      this.clearAfterWorkaround();
      console.log('clear');
      // this.router.navigate([navigatePath]);
    }

    this.appService.setTheme(theme);

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

  private clearAfterWorkaround(): void {
    localStorage.removeItem('callback-path-workaround');
    localStorage.removeItem('navigate-path-workaround');
  }
}
