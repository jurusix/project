import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ThemeMode } from '../enum/theme-mode';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
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
