import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map, mergeMap, Observable } from 'rxjs';
import { Board } from '../models/boards.model';
import { MainBoardService } from './main-board.service';

@Injectable()
export class BoardService {

  constructor(private http:HttpClient) {}

  getBoard(id:string):Observable<Board> {
    return this.http.get<Board[]>('boards').pipe(
      concatMap(boards => {
        const finded = boards.find((board) => board.id.includes(id))
        return this.http.get<Board> (`boards/${finded?.id}`);
      })
    )
  }
}
