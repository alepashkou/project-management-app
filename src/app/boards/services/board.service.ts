import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { Board, Colum } from '../models/boards.model';

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
}
