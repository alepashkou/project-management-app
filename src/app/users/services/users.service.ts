import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateUser, UserInfo } from '../users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = '';
  constructor(
    private httpClient: HttpClient
  ) { }

  getUserById(userId: string) {
    return this.httpClient.get<UserInfo>(`${this.apiUrl}/users/${userId}`)
  }

  updateUser(userData: UpdateUser, userId: string) {
    return this.httpClient.put<UserInfo>(`${this.apiUrl}users/${userId}`, userData)
  }
}