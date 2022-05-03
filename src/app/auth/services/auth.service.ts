import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignIn, SignUp } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '';
  constructor(
    private httpClient: HttpClient
  ) { }

  signIn(signIn: SignIn) {
    return this.httpClient.post<{ token: string }>(`${this.apiUrl}signin`, {
      login: signIn.login,
      "password": signIn.password,
    })
  }

  signUp(signUp: SignUp) {
    return this.httpClient.post<SignUp>(`${this.apiUrl}signup`, {
      "name": signUp.name,
      "login": signUp.login,
      "password": signUp.password
    })
  }
}