import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../core/auth/auth.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppService } from '../app.service';
import { ThemeMode } from '../core/enums/theme-mode';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';


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
    private appService: AppService,
    private translate: TranslateService) {
    const localLang = localStorage.getItem('lang');
    const browserLang = translate.getBrowserLang();
    const lang = localLang ? localLang : (browserLang.match(/en|cs/) ? browserLang : 'en');
    const theme = localStorage.getItem('theme-name') as ThemeMode || ThemeMode.Default;
    const navigatePath = localStorage.getItem('navigate-path-workaround');
    const callbackPath = localStorage.getItem('callback-path-workaround');

    translate.addLangs(['en', 'cs']);
    translate.setDefaultLang('en');
    translate.use(lang);
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      localStorage.setItem('lang', event.lang);
    });

    this.isAuthenticated = authService.isAuthenticated$;

    if (callbackPath) {
      localStorage.removeItem('callback-path-workaround');
      this.router.navigateByUrl(callbackPath);
    }
    else if (navigatePath) {
      localStorage.removeItem('navigate-path-workaround');
      this.router.navigate([navigatePath]);
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
}
