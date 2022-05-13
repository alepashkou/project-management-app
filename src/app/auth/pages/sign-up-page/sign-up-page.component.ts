import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { signup } from '../../store/auth.actions';

const LOGIN_MIN_LENGTH = 4;
const PASSWORD_MIN_LENGTH = 8;
@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {

  constructor(private store: Store) {
  }

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [
      Validators.required,
      Validators.minLength(LOGIN_MIN_LENGTH),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(PASSWORD_MIN_LENGTH),
      passwordDifficulty,
    ]),
    passwordRepeat: new FormControl('', [
      Validators.required,
      (passwordRepeatForm) => {
        if (passwordRepeatForm.value !== this.signUpForm?.value.password) {
          return { notMatch: 'Passwords do not match' }
        }
        return null
      }
    ])
  })

  signup() {
    if (this.signUpForm.valid) {
      this.store.dispatch(signup({ signupInfo: this.signUpForm.value }))
    }
  }
}

export const passwordDifficulty: ValidatorFn = (control: AbstractControl) => {
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