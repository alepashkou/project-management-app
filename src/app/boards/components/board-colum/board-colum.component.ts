import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/core/dialog/dialog.component';
import { Colum } from '../../models/boards.model';
import { BoardService } from '../../services/board.service';
import { DialogTaskComponent } from '../dialog-task/dialog-task.component';

@Component({
  selector: 'app-board-colum',
  templateUrl: './board-colum.component.html',
  styleUrls: ['./board-colum.component.scss'],
})
export class BoardColumComponent implements OnInit {
  @Input() colum: Colum;
  @Input() boardId: string;
  @Output() update = new EventEmitter<string>();

  editTitle: boolean = false;

  changeNameInput: FormControl;

  constructor(private boardService: BoardService, private dialog: MatDialog) {
    this.changeNameInput = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
  }
  ngOnInit() {
    this.changeNameInput.setValue(this.colum.title);
  }
  openDialog(action: string): void {
    if (action === 'Create') {
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
        }
      });
    } else {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          message: 'Are you sure you want to delete column?',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.deleteColum();
        }
      });
    }
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
      .subscribe((task) => {
        this.update.emit(task.id);
      });
  }
  deleteColum() {
    this.boardService.deleteColum(this.boardId, this.colum.id).subscribe(() => {
      this.update.emit(this.colum.id);
    });
  }
  changeTitle() {
    const title = this.changeNameInput.value;
    this.boardService
      .updateColum(this.boardId, this.colum.id, title, this.colum.order)
      .subscribe(() => {
        this.colum.title = title;
        this.editTitle = false;
      });
  }
}
