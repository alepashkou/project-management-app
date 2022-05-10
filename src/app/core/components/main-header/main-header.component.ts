import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { Task } from '../../../boards/models/boards.model';
import { FormControl } from '@angular/forms';
import { combineLatest, filter, map } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';


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
  constructor(public themeService: ThemeService, public translate: TranslateService, private searchService: SearchService, private router: Router) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang(localStorage.getItem('language') || 'en');
  }

  private _filterTasks(value: string, tasks: Task[]): Task[] {
    const filterValue = value.toLowerCase();
    return tasks.filter((task) => task.title.toLowerCase().includes(filterValue) || task.description.toLowerCase().includes(filterValue) || task.user.name.toLowerCase().includes(filterValue)
    )
  }

  ngOnInit(): void {
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

  public changeTheme(theme: string) {
    if (theme === 'dark-mode') {
      this.currentTheme = 'dark-mode';
    } else this.currentTheme = 'light';
    this.themeService.toggleTheme(theme);
  }

  onSelectTask(task: MatAutocompleteSelectedEvent) {
    console.log(task)
    this.router.navigate([`boards/${task.option.value.boardId}`], {
      queryParams: {
        openTask: task.option.value.id
      }
    })
  }

  displayFn(task?: Task) {
    return task?.title || ''
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