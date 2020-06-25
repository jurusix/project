import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './core/auth/auth.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

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
    private appService: AppService) {
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

  ngOnInit() { }

  logout() {
    this.authService.logout().then(
      () => this.router.navigate(['/login']),
      err => this.snackBar.open(err, '', { duration: 8000 })
    );
  }
}
