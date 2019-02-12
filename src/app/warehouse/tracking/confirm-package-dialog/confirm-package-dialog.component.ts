import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-warehouse-home-confirm-package-dialog',
  templateUrl: './confirm-package-dialog.component.html',
  styleUrls: ['../_tracking.scss']
})

export class ConfirmPackageDialogComponent implements OnInit {

  disabled: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmPackageDialogComponent>,
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
    this.homeService.pickStatus({
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
