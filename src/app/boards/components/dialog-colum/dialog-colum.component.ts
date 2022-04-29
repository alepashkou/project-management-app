import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogColumData } from '../../models/dialog.model';

@Component({
  selector: 'app-dialog-colum',
  templateUrl: './dialog-colum.component.html',
  styleUrls: ['./dialog-colum.component.scss'],
})
export class DialogColumComponent {
  action: string;

  localData: DialogColumData;

  param: FormControl;

  constructor(
    public dialog: MatDialogRef<DialogColumComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogColumData
  ) {
    this.localData = { ...data };
    this.action = this.localData.action;
    this.param = new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(15),
    ]);
  }

  doAction() {
    this.localData.title = this.param.value;
    this.dialog.close({ event: this.action, data: this.localData });
  }

  closeDialog() {
    this.dialog.close({ event: 'Cancel' });
  }
}
