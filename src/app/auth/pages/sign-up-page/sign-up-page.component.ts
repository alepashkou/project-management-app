import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { signup } from '../../store/auth.actions';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {

  constructor(private store: Store) { }

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  signup() {
    if (this.signUpForm.valid) {
      this.store.dispatch(signup({ signupInfo: this.signUpForm.value }))
    }
  }
}