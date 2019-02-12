import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-warehouse-home-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['../_tracking.scss']
})

export class ConfirmDeleteDialogComponent implements OnInit {

  disabled: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
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
    this.homeService.pickDelete(this.data.item).then((data) => {
      this.disabled = false;
      this.data.item = data;
      this.data.isEdit = true;
      this.close();
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
