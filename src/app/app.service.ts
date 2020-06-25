import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeMode } from './core/enums/theme-mode';

@Injectable({ providedIn: 'root' })
export class AppService {

  activeTheme: ThemeMode;

  private head: HTMLElement;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.head = this.document.getElementsByTagName('head')[0];
    const theme = localStorage.getItem('theme-name') as ThemeMode || ThemeMode.Default;
    this.changeTheme(theme);
  }

  changeTheme(theme: ThemeMode) {
    const themeLink = this.document.getElementById(
      'themeAsset'
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = `/assets/css/${theme}.css`;
    } else {
      const style = this.document.createElement('link');
      style.id = 'themeAsset';
      style.rel = 'stylesheet';
      style.href = `/assets/css/${theme}.css`;
      this.head.appendChild(style);
    }

    this.activeTheme = theme;
    localStorage.setItem('theme-name', theme);
  }
}
