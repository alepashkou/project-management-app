import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/users/store/users.reducer';
import { selectActiveUser } from 'src/app/users/store/users.selectors';
import { logoutUser } from 'src/app/users/store/users.actions';
import { UserInfo } from 'src/app/users/users.model';



@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  public curretnTheme: string | null = 'light';
  public curretnLanguage: string = 'en';
  public isCurretnLanguageChecked: boolean | null = false;

  public activeUserName: string | undefined;
  public isUserActive: boolean = false;

  
  constructor(public themeService: ThemeService, public translate: TranslateService, private store: Store<State>) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang(localStorage.getItem('language') || 'en');
  }

  ngOnInit(): void {

    this.isUserLogin();
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

  public activeUser() {
    this.store.select(selectActiveUser).subscribe(user => {
      this.activeUserName = user?.name;
    })
    return this.activeUserName;
  }

  public isUserLogin() {
    this.isUserActive = this.activeUserName ? true : false;
    return this.isUserActive;
  }

  public logout() {
    this.store.dispatch(logoutUser({ userInfo: { login: '', name: '', id: '' } }));
    localStorage.removeItem('token');
    this.isUserActive = false;
  }
}