import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../models/boards.model';
import { DialogTaskComponent } from '../../components/dialog-task/dialog-task.component';
import { BoardService } from '../../services/board.service';
import { UserResponce } from '../../models/dialog.model';
@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss'],
})
export class BoardTaskComponent implements OnInit {
  @Input() task: Task;
  @Input() columId: string;
  @Input() boardId: string;
  @Input() allUsers: UserResponce[];
  @Output() update = new EventEmitter<string>();

  currentUser?: UserResponce;

  constructor(private dialog: MatDialog, private boardService: BoardService) {}

  ngOnInit(): void {
    this.currentUser = this.allUsers.find((el) => el.id === this.task.userId);
  }

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
