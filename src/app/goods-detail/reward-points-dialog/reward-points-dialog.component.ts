import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-reward-points-dialog',
  templateUrl: './reward-points-dialog.component.html',
  styleUrls: ['./_reward-points-dialog.scss']
})

export class RewardPointsDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<RewardPointsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {}
  close(): void {
    this.dialogRef.close();
    // this.statusChange.emit(true)
  }
}
