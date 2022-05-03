import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '../users.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '';
  constructor(
    private httpClient: HttpClient
  ) { }

  getUserById(id: string) {
    return this.httpClient.get<UserInfo>(`${this.apiUrl}${id}`)
  }
}