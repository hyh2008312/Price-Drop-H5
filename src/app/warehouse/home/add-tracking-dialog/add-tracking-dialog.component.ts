import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { HomeService } from '../home.service';

@Component({
  selector: 'app-warehouse-home-add-tracking-dialog',
  templateUrl: './add-tracking-dialog.component.html',
  styleUrls: ['../_home.scss']
})

export class AddTrackingDialogComponent implements OnInit {

  purchaseForm : FormGroup;
  get tracking() { return this.purchaseForm.get('tracking') as FormArray; }

  constructor(
    public dialogRef: MatDialogRef<AddTrackingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private homeService: HomeService
  ) {
    this.purchaseForm = this.fb.group({
      id: [''],
      tracking: this.fb.array([])
    });

    this.purchaseForm.patchValue({
      id: this.data.item.id
    });

    this.getTracking();

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  save() {
    if(this.purchaseForm.invalid) return;
    const self = this;
    console.log(this.purchaseForm.value.tracking)

    let logisticsNumber: any = [];
    for(let item of this.purchaseForm.value.tracking) {
      logisticsNumber.push(item.tracking);
    }

    logisticsNumber = logisticsNumber.join(',');

    let params = {
      id : this.purchaseForm.value.id,
      logisticsNumber
    };

    this.homeService.addTracking(params).then((data) => {
      if(data.id) {
        self.data.isEdit = true;
        self.data.item = data;
        self.close();
      }
    });
  }

  getTracking() {
    const trackings = this.data.item.logisticsId.split(',');
    if(trackings && trackings.length > 0) {
      for(let item of trackings) {
        this.tracking.push(this.fb.group({
          tracking: [item]
        }));
      }
    }
  }

  addTracking() {
    this.tracking.push(this.fb.group({
      tracking: []
    }));
  }

  deleteTracking(i) {
    this.tracking.removeAt(i);
  }

}
