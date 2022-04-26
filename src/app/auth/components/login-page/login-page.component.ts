import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(
    private httpClient: HttpClient
  ) {
    this.httpClient.post<any>('http://localhost:4000/signin', {
      "login": "user001",
      "password": "userpass@123"
    }).subscribe((result) => console.log(result))
  }

}