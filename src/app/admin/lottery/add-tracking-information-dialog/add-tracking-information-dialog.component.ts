 import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LotteryService } from '../lottery.service';

@Component({
  selector: 'app-lottery-add-tracking-information-dialog',
  templateUrl: './add-tracking-information-dialog.component.html',
  styleUrls: ['../_lottery.scss']
})

export class AddTrackingInformationDialogComponent implements OnInit {

  trackingForm : FormGroup;
  shippingList = [];

  isShippingNumberEdit: boolean = false;

  order: any;

  constructor(
    public dialogRef: MatDialogRef<AddTrackingInformationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private orderService: LotteryService
  ) {
    this.getShippingList();
    this.trackingForm = this.fb.group({
      shippingNumber: ['', Validators.required],
      shippingId: ['']
    });
    this.order = data.order;
    this.trackingForm.patchValue({
      shippingNumber: this.order.shippingNumber,
      shippingId: this.order.shippingId
    });
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  changeTracking() {
    if(this.trackingForm.invalid) {
      return;
    }

    let tracking = {
      id: this.order.id,
      shippingNumber : this.trackingForm.value.shippingNumber,
      shippingId: this.trackingForm.value.shippingId
    };

    let self = this;
    this.orderService.changeTrackingInformation(tracking).then((data) => {
      self.close();
      self.data.isShippingNumberEdit = true;
      self.data.order = data;
    });
  }

  getShippingList() {
    this.orderService.getSupplyShippingList().then((data) => {
      this.shippingList = [...data];
    })
  }

}
