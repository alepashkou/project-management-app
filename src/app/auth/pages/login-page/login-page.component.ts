import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { login } from '../../store/auth.actions';
import { selectIsLoginInProgress } from '../../store/auth.selectors';

const LOGIN_MIN_LENGTH = 4;
const PASSWORD_MIN_LENGTH = 8;
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  isLoginInProgress$ = this.store.select(selectIsLoginInProgress);

  constructor(
    private store: Store,
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
      Validators.required,
      Validators.minLength(LOGIN_MIN_LENGTH),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(PASSWORD_MIN_LENGTH),
      passwordDifficulty,
    ])
  })

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(login(this.loginForm.value))
    }
  }
}

const passwordDifficulty: ValidatorFn = (control: AbstractControl) => {
  const strongRegex = new RegExp(
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'
  );

  const regexes: Array<[string, RegExp, string]> = [
    ['smallLetter', /[a-z]/, 'Password should contain small letter'],
    ['capitalLetter', /[A-Z]/, 'Password should contain capital letter'],
    ['number', /[0-9]/, 'Password should contain number'],
    [
      'symbol',
      /[!@#\$%\^&\*]/,
      'Password should contain special symbol (!@#$%^&*)',
    ],
  ];
  const regexTest = regexes.map((rule) => ({
    code: rule[0],
    result: rule[1].test(control.value),
    message: rule[2],
  }));
  const regexFilter = regexTest.filter((el) => el.result === false);
  const regexMessage = Object.fromEntries(
    regexFilter.map((el) => [el.code, el.message])
  );

  if (strongRegex.test(control.value)) {
    return null;
  }
  return regexMessage;
};


