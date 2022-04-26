import { Component, OnInit } from '@angular/core';
import { Board } from '../../models/boards.model';
import { MainBoardService } from '../../services/main-board.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public allBoards: Board[]

  constructor(private mainBoard:MainBoardService) { }

  ngOnInit(): void {
    this.mainBoard.getAllBoards().subscribe((values)=> this.allBoards = values)
  }
  getLoginToken():void {
    this.mainBoard.login().subscribe((value)=> {console.log(value), localStorage.setItem('token', value.token)});
  }
}
