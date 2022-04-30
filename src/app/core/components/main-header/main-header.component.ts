import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  public curretnTheme: string | null = 'light';
  public curretnLanguage: string | null = '';
  public isCurretnLanguageChecked: boolean | null = false;
  public isDarkTheme: boolean = false;
  constructor() { }

  ngOnInit(): void {
    
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

  toggleTheme(theme: string) {
      this.curretnTheme = theme;
      localStorage.setItem('theme', theme);
      this.isDarkTheme = !this.isDarkTheme;
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

}
