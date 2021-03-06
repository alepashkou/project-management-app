import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from 'src/app/core/dialog/dialog.component';
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
    if (action !== 'Delete') {
      const dialog = this.dialog.open(DialogBoxComponent, {
        width: '300px',
        data: { action, id },
      });
      dialog.afterClosed().subscribe((result) => {
        if (result.event === 'Delete') {
          this.deleteBoard(result.data.id);
        } else if (result.event === 'Create') {
          this.createBoard(result.data.title, result.data.description);
        } else if (result.event === 'Edit') {
          this.editBoard(
            result.data.title,
            result.data.id,
            result.data.description
          );
        }
      });
    } else {
      let message = '';
      if (localStorage.getItem('language') === 'en') {
        message = 'Are you sure you want to delete board?'
      } else {
        message = 'Вы действительно хотите удалить доску?'
      }
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          message: message,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result && id) {
          this.deleteBoard(id);
        }
      });
    }
  }
  deleteBoard(id: string): void {
    this.allBoards = this.allBoards.filter((board) => {
      return board.id !== id;
    });
    this.mainBoard.deleteBoard(id).subscribe();
  }
  createBoard(title: string, description: string): void {
    this.mainBoard.craeteBoard(title, description).subscribe((board) => {
      this.allBoards.push(board);
    });
  }
  editBoard(title: string, id: string, description: string): void {
    this.mainBoard.editBoard(title, id, description).subscribe((board) => {
      this.allBoards = this.allBoards.map((el) => {
        if (el.id === board.id) {
          el.title = board.title;
          el.description = board.description;
        }
        return el;
      });
    });
  }
}
