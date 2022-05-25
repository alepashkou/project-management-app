import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

export enum themeMode {
  dark = 'dark-mode',
  light = 'light'
}

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private renderer: Renderer2;
  private colorTheme: string = '';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public initTheme() {
    this.getColorTheme();
    this.renderer.addClass(document.body, this.colorTheme)
  }

  public toggleTheme(theme: string) {
    const previousColorTheme = theme === themeMode.dark ? themeMode.light : themeMode.dark;
    this.setColorTheme(theme);
    
    this.renderer.removeClass(document.body, previousColorTheme);
    this.renderer.addClass(document.body, theme);
  }

  private setColorTheme(theme: string) {
    this.colorTheme = theme;
    localStorage.setItem('theme', theme);
  }

  private getColorTheme() {
    if (localStorage.getItem('theme')) {
      this.colorTheme = localStorage.getItem('theme')!;
    } else {
      this.colorTheme = 'light';
    }
  }
}
