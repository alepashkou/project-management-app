import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignIn } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://managment-app.ddns.net'
  constructor(
    private httpClient: HttpClient
  ) { }

  signIn(signIn: SignIn) {
    return this.httpClient.post<{ token: string }>(`${this.apiUrl}/signin`, {
      "login": signIn.login,
      "password": signIn.password,
    })
  }
}