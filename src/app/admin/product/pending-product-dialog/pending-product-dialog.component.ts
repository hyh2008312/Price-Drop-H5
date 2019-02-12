import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-product-pending-product-dialog',
  templateUrl: './pending-product-dialog.component.html',
  styleUrls: ['../product.scss']
})

export class PendingProductDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PendingProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

}
