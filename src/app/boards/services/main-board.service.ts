import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board, Token } from '../models/boards.model';
@Injectable()
export class MainBoardService {
  constructor(private http: HttpClient) {}

  getAllBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`boards`);
  }
  deleteBoard(id: string): Observable<Response> {
    return this.http.delete<Response>(`boards/${id}`);
  }
  craeteBoard(title: string, description: string): Observable<Board> {
    return this.http.post<Board>(`boards`, {
      title: title,
      description: description,
    });
  }
  editBoard(title: string, id: string, description: string): Observable<Board> {
    return this.http.put<Board>(`boards/${id}`, {
      title: title,
      description: description,
    });
  }
}
