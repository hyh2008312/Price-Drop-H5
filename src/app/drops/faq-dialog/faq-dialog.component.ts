import {Component, Inject, OnInit} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'faq-dialog',
  templateUrl: './faq-dialog.component.html',
  styleUrls: ['./_faq-dialog.scss']
})

export class FaqDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<FaqDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }
}
