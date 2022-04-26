import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../components/dialog-box/dialog-box.component';
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
    this.mainBoard.getAllBoards().subscribe((values)=> this.allBoards = values)
  }
  openDialog(action:string, id?:string):void {
    const dialog = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: {action, id}
    });
    dialog.afterClosed().subscribe(result => {
      if(result.event == 'Delete'){
        this.deleteBoard(result.data.id);
      }else if(result.event == 'Create'){
        this.createBoard(result.data.createBoard);
      }
    });
  }
  deleteBoard(id:string):void {
    this.allBoards = this.allBoards.filter((board) => {
      return board.id !== id
    })
    this.mainBoard.deleteBoard(id).subscribe();
  }
  createBoard(name:string){
    this.mainBoard.craeteBoard(name).subscribe((board) => {
      this.allBoards.push(board);
    })
  }
  //УДАЛИТЬ
  getLoginToken():void {
    this.mainBoard.login().subscribe((value)=> {console.log(value), localStorage.setItem('token', value.token)});
  }
}
