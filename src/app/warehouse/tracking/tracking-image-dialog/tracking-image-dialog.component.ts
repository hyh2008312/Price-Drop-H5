import { Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-warehouse-tracking-image-dialog',
  templateUrl: './tracking-image-dialog.component.html',
  styleUrls: ['../_tracking.scss']
})

export class TrackingImageDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TrackingImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}

  close() {
    this.dialogRef.close();
  }

}
