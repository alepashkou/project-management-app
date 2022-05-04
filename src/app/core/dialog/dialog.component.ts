import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  message: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

}