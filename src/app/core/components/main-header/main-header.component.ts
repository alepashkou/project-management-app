import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  public curretnTheme: string | null = 'light';
  public curretnLanguage: string = 'en';
  public isCurretnLanguageChecked: boolean | null = false;
  constructor(public themeService: ThemeService, public translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang(localStorage.getItem('language') || 'en');
  }

  ngOnInit(): void {
    this.themeService.initTheme();
    
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light');
    } else this.curretnTheme = localStorage.getItem('theme');
    
    if (localStorage.getItem('language')) {
      this.curretnLanguage = localStorage.getItem('language')!;
    } else localStorage.setItem('language', 'en');

    if (localStorage.getItem('language') === 'en') {
      this.isCurretnLanguageChecked = true;
    }
  }

  checkLanguage() {
    if (this.isCurretnLanguageChecked) {
      localStorage.setItem('language', 'en');
      this.curretnLanguage = 'en';
    } if (!this.isCurretnLanguageChecked) {
      this.isCurretnLanguageChecked = true;
      localStorage.setItem('language', 'ru');
      this.curretnLanguage = 'ru';
    }
    this.translate.use(this.curretnLanguage);
      this.isCurretnLanguageChecked = false;
  }

  public changeTheme(theme: string) {
    if (theme === 'dark-mode') {
      this.curretnTheme = 'dark-mode';
    } else this.curretnTheme = 'light';
    this.themeService.toggleTheme(theme);
  }
}

window.onscroll = () => {
  addSticky();
}

function addSticky() {
  const sticky: HTMLElement = document.querySelector('.page-header')!;
  const stickyPosition = sticky.offsetTop;
  if (stickyPosition > 1) {
    sticky.classList.add('sticky');
  } else {
    sticky.classList.remove('sticky');
  }
}