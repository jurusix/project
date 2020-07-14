import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from '../app.service';
import { ThemeMode } from '../core/enums/theme-mode';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {

  themeMode = ThemeMode;

  constructor(
    public appService: AppService,
    public translate: TranslateService) { }

}
