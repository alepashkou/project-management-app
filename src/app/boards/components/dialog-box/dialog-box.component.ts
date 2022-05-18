import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Inject,
  Optional,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  form: FormGroup;
  
  constructor(
    public dialog: MatDialogRef<DialogBoxComponent>,
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogBoxData
  ) {
    this.dialog.disableClose = true;
    this.localData = { ...data };
    this.action = this.localData.action;
    this.form = new FormGroup({
      title: new FormControl('', [Validators.minLength(3), Validators.maxLength(15)]),
      description: new FormControl('', [Validators.minLength(3), Validators.maxLength(30)])
    });
  }
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
  doAction() {
    this.localData.title = this.form.controls['title'].value
    this.localData.description = this.form.controls['description'].value
    this.dialog.close({ event: this.action, data: this.localData });
  }

  closeDialog() {
    this.dialog.close({ event: 'Cancel' });
  }
}
