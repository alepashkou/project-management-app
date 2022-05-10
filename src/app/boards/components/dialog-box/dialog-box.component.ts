import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Inject,
  Optional,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBoxData } from '../../models/dialog.model';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class DialogBoxComponent implements AfterViewChecked {
  action: string;

  localData: DialogBoxData;

  title: FormControl;

  description: FormControl;

  constructor(
    public dialog: MatDialogRef<DialogBoxComponent>,
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogBoxData
  ) {
    this.dialog.disableClose = true;
    this.localData = { ...data };
    this.action = this.localData.action;
    this.title = new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(15),
    ]);
    this.description = new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(15),
    ]);
  }
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
  doAction() {
    this.localData.title = this.title.value;
    this.localData.description = this.description.value;
    this.dialog.close({ event: this.action, data: this.localData });
  }

  closeDialog() {
    this.dialog.close({ event: 'Cancel' });
  }
}
