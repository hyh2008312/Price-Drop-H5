import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-warehouse-home-confirm-not-found-dialog',
  templateUrl: './confirm-not-found-dialog.component.html',
  styleUrls: ['../_tracking.scss']
})

export class ConfirmNotFoundDialogComponent implements OnInit {

  disabled: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmNotFoundDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private homeService: TrackingService
  ) {

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  confirm() {
    this.disabled = true;
    this.homeService.pickStatusChange({
      id: this.data.item.id
    }).then((data) => {
      this.disabled = false;
      if(data.id) {
        this.data.item = data;
        this.data.isEdit = true;
        this.close();
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
