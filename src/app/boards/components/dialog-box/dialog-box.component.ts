import { Component, Inject, Optional } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../models/dialog.model';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {
  action: string;

  localData: DialogData;

  param: FormControl;

  constructor(
    public dialog: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.localData = {...data};
    this.action = this.localData.action;
    this.param = new FormControl('', [Validators.minLength(3), Validators.maxLength(15)]);
  }

  doAction(){
    this.localData.param = this.param.value;
    this.dialog.close({event:this.action, data:this.localData});
  }

  closeDialog(){
    this.dialog.close({event:'Cancel'});
  }
}
