import { Component, OnInit } from '@angular/core';
import { themeMode, ThemeService } from '../../services/theme.service';


@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  public curretnTheme: string | null = 'light';
  public curretnLanguage: string | null = '';
  public isCurretnLanguageChecked: boolean | null = false;
  constructor(public themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.initTheme();
    
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light');
    } else this.curretnTheme = localStorage.getItem('theme');
    
    if (localStorage.getItem('language')) {
      this.curretnLanguage = localStorage.getItem('language');
    } else localStorage.setItem('language', 'ENG');

    if (localStorage.getItem('language') === 'ENG') {
      this.isCurretnLanguageChecked = true;
    }
  }

  checkLanguage() {
    if (this.isCurretnLanguageChecked) {
      localStorage.setItem('language', 'ENG');
      this.curretnLanguage = 'ENG';
    } if (!this.isCurretnLanguageChecked) {
      this.isCurretnLanguageChecked = true;
      localStorage.setItem('language', 'RU');
      this.curretnLanguage = 'RU';
    }
      this.isCurretnLanguageChecked = false;
  }

  public changeTheme(theme: string) {
    if (theme === 'dark-mode') {
      this.curretnTheme = 'dark-mode';
    } else this.curretnTheme = 'light';
    this.themeService.toggleTheme(theme);
  }
}