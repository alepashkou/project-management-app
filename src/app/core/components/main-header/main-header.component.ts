import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { Task } from '../../../boards/models/boards.model';
import { FormControl } from '@angular/forms';
import { combineLatest, filter, map } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Store } from '@ngrx/store';
import { State } from 'src/app/users/store/users.reducer';
import { selectActiveUser } from 'src/app/users/store/users.selectors';
import { UsersService } from 'src/app/users/services/users.service';
import { Router } from '@angular/router';
import { logout } from 'src/app/auth/store/auth.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  searchTextControl = new FormControl();

  tasks$ = this.searchService.getAllTasks();

  filteredTasks$ = combineLatest([this.tasks$,
  this.searchTextControl.valueChanges.pipe(
    filter((textOrTask) => typeof textOrTask === 'string')
  )
  ]).pipe(
    map(([tasks, searchText]) => {
      if (searchText) {
        return this._filterTasks(searchText, tasks)
      }
      return []
    })
  )

  public currentTheme: string | null = 'light';
  public currentLanguage: string = 'en';
  public isCurrentLanguageChecked: boolean | null = false;
  public activeUserName: string | undefined;
  public isUserActive: boolean

  constructor(
    public themeService: ThemeService,
    public translate: TranslateService,
    private searchService: SearchService,
    private router: Router,
    private store: Store<State>,
    private usersService: UsersService,
    private matSnackBar: MatSnackBar
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang(localStorage.getItem('language') || 'en');
  }

  private _filterTasks(value: string, tasks: Task[]): Task[] {
    const filterValue = value.toLowerCase();
    return tasks.filter((task) => {
      if (task.user) {
        return task.title.toLowerCase().includes(filterValue) || task.description.toLowerCase().includes(filterValue)
      }
      return task.title.toLowerCase().includes(filterValue) || task.description.toLowerCase().includes(filterValue)
    }
    )
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
    } else this.currentTheme = localStorage.getItem('theme');

    if (localStorage.getItem('language')) {
      this.currentLanguage = localStorage.getItem('language')!;
    } else localStorage.setItem('language', 'en');

    if (localStorage.getItem('language') === 'en') {
      this.isCurrentLanguageChecked = true;
    }
  }

  checkLanguage() {
    if (this.isCurrentLanguageChecked) {
      localStorage.setItem('language', 'en');
      this.currentLanguage = 'en';
    } if (!this.isCurrentLanguageChecked) {
      this.isCurrentLanguageChecked = true;
      localStorage.setItem('language', 'ru');
      this.currentLanguage = 'ru';
    }
    this.translate.use(this.currentLanguage);
    this.isCurrentLanguageChecked = false;
  }

  public changeTheme(theme: string): void {
    if (theme === 'dark-mode') {
      this.currentTheme = 'dark-mode';
    } else this.currentTheme = 'light';
    this.themeService.toggleTheme(theme);
  }

  onSelectTask(task: MatAutocompleteSelectedEvent) {
    this.router.navigate([`boards/${task.option.value.boardId}`], {
      queryParams: {
        openTask: task.option.value.id
      }
    })
  }

  displayFn(task?: Task) {
    return task?.title || ''
  }

  public activeUser(): void {
    this.store.select(selectActiveUser).subscribe((userName) => {
      this.activeUserName = userName?.name;
    });
  }

  public logout(): void {
    this.store.dispatch(logout());
  }

  public checkUserStatus(): boolean {
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
