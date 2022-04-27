import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { login } from '../../store/auth.actions';
import { selectIsLoginInProgress } from '../../store/auth.selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  isLoginInProgress$ = this.store.select(selectIsLoginInProgress);

  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) {
    this.isLoginInProgress$.subscribe((value) => {
      if (value) {
        this.loginForm.disable()
      } else {
        this.loginForm.enable()
      }
    })
    // this.httpClient.post<any>('https://managment-app.ddns.net/signin', {
    //   "login": "user001",
    //   "password": "userpass@123"
    // }).subscribe((result) => console.log(result))
  }

  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(login(this.loginForm.value))
      console.log(this.loginForm.value)
      // navigate
    }
  }

}