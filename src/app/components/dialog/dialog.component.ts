import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(private formbuilder: FormBuilder,public dialogRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogRef.disableClose = true;
  }

  dataForm = this.formbuilder.group({
    title: this.formbuilder.control(''),
    desc: this.formbuilder.control(''),
  });

  addData() {
    this.dialogRef.close(this.dataForm.value);
  }

  closeData() {
    this.dialogRef.close(null);
  }
}
