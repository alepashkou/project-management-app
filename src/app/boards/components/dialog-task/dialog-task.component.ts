import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogTaskData, UserResponce } from '../../models/dialog.model';
import { BoardService } from '../../services/board.service';
import { DialogColumComponent } from '../dialog-colum/dialog-colum.component';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.scss'],
})
export class DialogTaskComponent implements AfterViewChecked, OnInit {
  action: string;

  localData: DialogTaskData;

  param: FormGroup;

  userList: UserResponce[];

  constructor(
    public dialog: MatDialogRef<DialogColumComponent>,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private boardService: BoardService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogTaskData
  ) {
    this.dialog.disableClose = true;
    this.localData = { ...data };
    this.action = this.localData.action;
    this.param = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl('', [Validators.required]),
      userId: new FormControl('', [Validators.required]),
      done: new FormControl(false),
    });
  }
  ngOnInit(): void {
    if (this.action === 'Create' || this.action === 'Edit') {
      this.boardService
        .getAllUsers()
        .subscribe((users) => (this.userList = users));
    }
    if (this.action === 'Edit') {
      this.param.setValue({
        title: this.localData.task?.title,
        description: this.localData.task?.description,
        userId: this.localData.task?.userId,
        done: this.localData.task?.done,
      });
    }
  }
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
  doAction() {
    this.localData.task.title = this.param.get('title')?.value;
    this.localData.task.description = this.param.get('description')?.value;
    this.localData.task.userId = this.param.get('userId')?.value;
    this.localData.task.done = this.param.get('done')?.value;
    this.dialog.close({ event: this.action, data: this.localData });
  }

  closeDialog() {
    this.dialog.close({ event: 'Cancel' });
  }
}
