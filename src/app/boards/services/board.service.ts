import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { Board, Colum } from '../models/boards.model';
import { UserResponce } from '../models/dialog.model';
import { Task } from '../models/boards.model';
@Injectable()
export class BoardService {
  constructor(private http: HttpClient) {}

  getBoard(id: string): Observable<Board> {
    return this.http.get<Board[]>('boards').pipe(
      concatMap((boards) => {
        const finded = boards.find((board) => board.id.includes(id));
        return this.http.get<Board>(`boards/${finded?.id}`);
      })
    );
  }
  createColum(
    title: string,
    boardId: string,
    lenght: number = 0
  ): Observable<Colum> {
    return this.http.post<Colum>(`boards/${boardId}/columns`, {
      title: title,
      order: lenght + 1,
    });
  }
  createTask(
    title: string,
    desc: string,
    userId: string,
    columId: string,
    boardId: string,
    lenght: number = 0
  ) {
    return this.http.post<Task>(`boards/${boardId}/columns/${columId}/tasks`, {
      title: title,
      order: lenght + 1,
      description: desc,
      userId: userId,
    });
  }
  getAllUsers() {
    return this.http.get<UserResponce[]>(`users`);
  }
}
