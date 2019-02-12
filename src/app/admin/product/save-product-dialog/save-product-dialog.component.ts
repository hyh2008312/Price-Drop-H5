import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-product-save-product-dialog',
  templateUrl: './save-product-dialog.component.html',
  styleUrls: ['../product.scss']
})

export class SaveProductDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SaveProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  save() {
    this.data.isSaved = true;
    this.close();
  }

}
