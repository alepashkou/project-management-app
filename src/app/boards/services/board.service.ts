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
      done: false,
    });
  }
  getAllUsers() {
    return this.http.get<UserResponce[]>(`users`);
  }
  deleteTask(boardId: string, columId: string, taskId: string) {
    return this.http.delete(
      `boards/${boardId}/columns/${columId}/tasks/${taskId}`
    );
  }
  deleteColum(boardId: string, columId: string) {
    return this.http.delete(`boards/${boardId}/columns/${columId}`);
  }
  updateTask(
    boardId: string,
    columnId: string,
    task: Task,
    columIdNew?: string
  ) {
    return this.http.put<Task>(
      `boards/${boardId}/columns/${columnId}/tasks/${task.id}`,
      {
        boardId: boardId,
        columnId: columIdNew || columnId,
        userId: task.userId,
        title: task.title,
        description: task.description,
        order: task.order,
        done: false,
      }
    );
  }
  updateColum(boardId: string, columnId: string, title: string, order: number) {
    return this.http.put(`boards/${boardId}/columns/${columnId}`, {
      title: title,
      order: order,
    });
  }
}
