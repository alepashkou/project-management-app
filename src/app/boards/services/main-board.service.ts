import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board, Token } from '../models/boards.model'
@Injectable()
export class MainBoardService {

  constructor(private http:HttpClient) { }

  getAllBoards():Observable<Board[]>{
    return this.http.get<Board[]>(`boards`)
  }

  login(){
    return this.http.post<Token>('signin', { login: "test", password: "test" })
  }
}
