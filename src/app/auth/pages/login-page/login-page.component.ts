import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { login } from '../../store/auth.actions';
import { selectIsLoginInProgress } from '../../store/auth.selectors';
import { UsersService } from 'src/app/users/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  isLoginInProgress$ = this.store.select(selectIsLoginInProgress);

  constructor(
    private store: Store,
    private usersService: UsersService,
    private router: Router
  ) {
    this.isLoginInProgress$.subscribe((value) => {
      if (value) {
        this.loginForm.disable()
      } else {
        this.loginForm.enable()
      }
    })
  }

  loginForm = new FormGroup({
    login: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(login(this.loginForm.value));
      this.usersService.updateUserLoginStatus(true);
    }
  }

  goToSingUp() {
    this.router.navigate(['auth/signup'])
  }
}


