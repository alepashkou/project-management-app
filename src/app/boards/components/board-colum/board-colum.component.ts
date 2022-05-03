import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Colum } from '../../models/boards.model';
import { BoardService } from '../../services/board.service';
import { DialogTaskComponent } from '../dialog-task/dialog-task.component';

@Component({
  selector: 'app-board-colum',
  templateUrl: './board-colum.component.html',
  styleUrls: ['./board-colum.component.scss'],
})
export class BoardColumComponent {
  @Input() colum: Colum;
  @Input() boardId: string;
  @Output() deleteColumId = new EventEmitter<string>();
  constructor(private boardService: BoardService, private dialog: MatDialog) {}
  openDialog(action: string): void {
    const dialog = this.dialog.open(DialogTaskComponent, {
      width: '300px',
      data: { action, task: {} },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.event === 'Create') {
        this.createTask(
          result.data.task.title,
          result.data.task.description,
          result.data.task.userId
        );
      } else if (result.event === 'Delete') {
        this.deleteColum();
      }
    });
  }
  createTask(title: string, desc: string, userId: string) {
    this.boardService
      .createTask(
        title,
        desc,
        userId,
        this.colum.id,
        this.boardId,
        this.colum.tasks?.length
      )
      .subscribe((task) => this.colum?.tasks?.push(task));
  }
  deleteColum() {
    this.boardService.deleteColum(this.boardId, this.colum.id).subscribe(() => {
      this.deleteColumId.emit(this.colum.id);
    });
  }
}
