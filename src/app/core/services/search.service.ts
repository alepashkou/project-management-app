import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/boards/models/boards.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = '';
  constructor(
    private httpClient: HttpClient
  ) { }

  getAllTasks() {
    return this.httpClient.get<Task[]>(`${this.apiUrl}search/tasks`)
  }
}