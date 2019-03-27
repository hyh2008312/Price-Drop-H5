import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ship-cost-dialog',
  templateUrl: './ship-cost-dialog.component.html',
  styleUrls: ['./_ship-cost-dialog.scss']
})

export class ShipCostDialogComponent implements OnInit {

  shipObj: any= {};
  constructor(
    public dialogRef: MatDialogRef<ShipCostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.shipObj = this.data.ship;
  }
  getNowDay1 (str: any) {
    if (str) {
      const date = new Date().getTime();
      return new Date(date + ((24 * 60 * 60 * 1000) * (7 + str)));
    } else {
      return new Date();
    }
  }
  close(): void {
    this.dialogRef.close();
    // this.statusChange.emit(true)
  }
}
