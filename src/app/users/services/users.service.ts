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
    return this.httpClient.get<UserInfo>(`${this.apiUrl}users/${userId}`)
  }

  updateUser(userData: UpdateUser, userId: string) {
    const data: UpdateUser = {
      name: userData.name,
      login: userData.login,
      password: userData.password
    }
    return this.httpClient.put<UserInfo>(`${this.apiUrl}users/${userId}`, data)
  }

  deleteUser(userId: string) {
    return this.httpClient.delete(`${this.apiUrl}users/${userId}`)
  }
}  