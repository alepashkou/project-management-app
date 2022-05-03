import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogBoxComponent } from '../../components/dialog-box/dialog-box.component';
import { Board } from '../../models/boards.model';
import { MainBoardService } from '../../services/main-board.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public allBoards: Board[];

  constructor(
    private mainBoard: MainBoardService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mainBoard
      .getAllBoards()
      .subscribe((values) => (this.allBoards = values));
    this.route.queryParams.subscribe((params) => {
      if (params['action'] === 'Create') {
        this.openDialog('Create');
      }
    });
  }
  openDialog(action: string, id?: string): void {
    const dialog = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: { action, id },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.event === 'Delete') {
        this.deleteBoard(result.data.id);
      } else if (result.event === 'Create') {
        this.createBoard(result.data.param);
      } else if (result.event === 'Edit') {
        this.editBoard(result.data.param, result.data.id);
      }
    });
  }
  deleteBoard(id: string): void {
    this.allBoards = this.allBoards.filter((board) => {
      return board.id !== id;
    });
    this.mainBoard.deleteBoard(id).subscribe();
  }
  createBoard(name: string): void {
    this.mainBoard.craeteBoard(name).subscribe((board) => {
      this.allBoards.push(board);
    });
  }
  editBoard(name: string, id: string): void {
    this.mainBoard.editBoard(name, id).subscribe((board) => {
      this.allBoards = this.allBoards.map((el) => {
        if (el.id === board.id) {
          el.title = board.title;
        }
        return el;
      });
    });
  }
}
