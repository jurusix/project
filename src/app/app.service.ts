import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeMode } from './core/enums/theme-mode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AppService {

  activeTheme = ThemeMode.Default;
  private head: HTMLElement;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object) {
    this.head = this.document.getElementsByTagName('head')[0];
  }

  setTheme(theme: ThemeMode): void {
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
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme-name', theme);
    }
  }
}
