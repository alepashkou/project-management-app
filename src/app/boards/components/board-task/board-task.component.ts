import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../models/boards.model';
import { DialogTaskComponent } from '../../components/dialog-task/dialog-task.component';
import { BoardService } from '../../services/board.service';
@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss'],
})
export class BoardTaskComponent {
  @Input() task: Task;
  @Input() columId: string;
  @Input() boardId: string;
  @Output() update = new EventEmitter<string>();

  constructor(private dialog: MatDialog, private boardService: BoardService) {}

  openDialog(action: string): void {
    const dialog = this.dialog.open(DialogTaskComponent, {
      width: '300px',
      data: { action, task: this.task },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.event === 'Delete') {
        this.deleteTask();
      } else if (result.event === 'Edit') {
        this.updateTask(result.data.task);
      }
    });
  }
  deleteTask() {
    this.boardService
      .deleteTask(this.boardId, this.columId, this.task.id)
      .subscribe(() => {
        this.update.emit(this.task.id);
      });
  }
  updateTask(task: Task) {
    this.boardService
      .updateTask(this.boardId, this.columId, task)
      .subscribe(() => {
        this.update.emit(this.task.id);
      });
  }
}
