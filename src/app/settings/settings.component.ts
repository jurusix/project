import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from '../app.service';
import { ThemeMode } from '../core/enums/theme-mode';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {

  themeMode = ThemeMode;

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

  changeTheme(mode: ThemeMode) {
    this.appService.changeTheme(mode);
  }
}
