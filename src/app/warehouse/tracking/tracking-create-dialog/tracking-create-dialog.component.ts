import { Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormArray } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-warehouse-tracking-create-dialog',
  templateUrl: './tracking-create-dialog.component.html',
  styleUrls: ['../_tracking.scss']
})

export class TrackingCreateDialogComponent implements OnInit {

  purchaseForm : FormGroup;
  error: any = false;
  warehouseList: any;

  get pickInfo() { return this.purchaseForm.get('pickInfo') as FormArray; }

  constructor(
    public dialogRef: MatDialogRef<TrackingCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private homeService: TrackingService
  ) {

    this.getWarehouseList();

    this.purchaseForm = this.fb.group({
      pickNumber: ['', Validators.required],
      internationalCarrier: ['GATI', Validators.required],
      internationalTrackingNumber: ['', Validators.required],
      pickInfo: this.fb.array([]),
      warehouseId: ['', Validators.required],
    });

  }

  ngOnInit() {}

  ngOnDestroy() {}

  close() {
    this.dialogRef.close();
  }

  publish() {
    if(this.purchaseForm.invalid) {
      return;
    }
    this.homeService.pickCreate(this.purchaseForm.value).then((data) => {
      if(data && data.id) {
        this.error = false;
        this.data.isCreated = true;
        this.close();
      } else {
        this.error = data.detail;
      }
    }).catch((error) => {
      this.error = error;
    });
  }

  delete(i) {
    this.pickInfo.removeAt(i);
  }

  addPurchaseItem() {
    this.pickInfo.push(this.fb.group({
      sku: ['', Validators.required],
      orderNumber: ['', Validators.required],
      pickQuantity: ['', Validators.required]
    }));
  }

  getWarehouseList() {
    this.homeService.getWarehouseList().then((data) => {
      this.warehouseList = [...data];
    });
  }

}
