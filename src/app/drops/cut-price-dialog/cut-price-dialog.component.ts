import {Component, Inject, OnInit} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'cut-price-dialog',
  templateUrl: './cut-price-dialog.component.html',
  styleUrls: ['./_cut-price-dialog.scss']
})

export class CutPriceDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<CutPriceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }
}
