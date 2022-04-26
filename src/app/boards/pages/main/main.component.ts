import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { DialogDeleteBoardComponent } from '../../components/dialog-delete-board/dialog-delete-board.component';
import { Board } from '../../models/boards.model';
import { MainBoardService } from '../../services/main-board.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public allBoards: Board[]

  constructor(private mainBoard: MainBoardService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.mainBoard.getAllBoards().pipe(take(1)).subscribe((values)=> this.allBoards = values)
  }
  dialogDeleteBoard(id:string):void {
    let dialog = this.dialog.open(DialogDeleteBoardComponent)
    dialog.afterClosed().subscribe((result) => {
      if(result === 'true') this.deleteBoard(id);
    })
  }
  deleteBoard(id:string):void {
    this.allBoards = this.allBoards.filter((board) => {
      return board.id !== id
    })
  }
  getLoginToken():void {
    this.mainBoard.login().subscribe((value)=> {console.log(value), localStorage.setItem('token', value.token)});
  }
}
