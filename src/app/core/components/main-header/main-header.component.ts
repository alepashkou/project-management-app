import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/users/store/users.reducer';
import { selectActiveUser } from 'src/app/users/store/users.selectors';
import { logoutUser } from 'src/app/users/store/users.actions';
import { UsersService } from 'src/app/users/services/users.service';

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
  public isUserActive: boolean;

  constructor(
    public themeService: ThemeService,
    public translate: TranslateService,
    private store: Store<State>,
    private usersService: UsersService
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang(localStorage.getItem('language') || 'en');
  }

  ngOnInit(): void {

    window.onscroll = () => {
      this.addSticky();
    }

    if (localStorage.getItem('token')) {
      this.usersService.updateUserLoginStatus(true);
    }

    this.activeUser();
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

  public changeTheme(theme: string): void {
    if (theme === 'dark-mode') {
      this.curretnTheme = 'dark-mode';
    } else this.curretnTheme = 'light';
    this.themeService.toggleTheme(theme);
  }

  public activeUser(): void {
    this.store.select(selectActiveUser).subscribe((userName) => {
      this.activeUserName = userName?.name;
    });
  }

  public logout(): void {
    this.store.dispatch(logoutUser({ userInfo: { login: '', name: '', id: '' } }));
    localStorage.removeItem('token');
    this.usersService.updateUserLoginStatus(false);
  }

  public chekUserStatus(): boolean {
    return this.usersService.getUserStatus();
  }

  public addSticky(): void {
    const sticky: HTMLElement = document.querySelector('.page-header')!;
    const stickyPosition = sticky.offsetTop;
    if (stickyPosition > 1) {
      sticky.classList.add('sticky');
    } else {
      sticky.classList.remove('sticky');
    }
  }

}