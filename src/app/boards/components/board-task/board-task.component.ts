import { Component, Input } from '@angular/core';
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

  constructor(private dialog: MatDialog, private boardService: BoardService) {}

  openDialog(action: string): void {
    const dialog = this.dialog.open(DialogTaskComponent, {
      width: '300px',
      data: { action, task: this.task },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.event === 'Delete') {
        this.deleteTask();
      }
    });
  }
  deleteTask() {
    this.boardService
      .deleteTask(this.boardId, this.columId, this.task.id)
      .subscribe(() => {
        //Удалить таск выше
        console.log('delete');
      });
  }
}
