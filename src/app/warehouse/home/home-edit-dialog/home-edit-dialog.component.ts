import { Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormArray } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

import { HomeService } from '../home.service';

@Component({
  selector: 'app-warehouse-home-edit-dialog',
  templateUrl: './home-edit-dialog.component.html',
  styleUrls: ['../_home.scss']
})

export class HomeEditDialogComponent implements OnInit {

  purchaseForm : FormGroup;
  error: any = false;
  supplierList: any = ['getpricedrop', '北京云海'];
  warehouseList: any;

  get purchaseInfo() { return this.purchaseForm.get('purchaseInfo') as FormArray; }

  constructor(
    public dialogRef: MatDialogRef<HomeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private homeService: HomeService
  ) {

    this.getWarehouseList();

    this.purchaseForm = this.fb.group({
      id: ['', Validators.required],
      purchaseId: ['', Validators.required],
      purchaseInfo: this.fb.array([]),
      purchaseAccount: ['getpricedrop', Validators.required],
      warehouseId: ['']
    });

    this.purchaseForm.patchValue({
      id: this.data.item.id,
      purchaseId: this.data.item.purchaseId,
      purchaseAccount: this.data.item.purchaseAccount,
      warehouseId: this.data.item.warehouseId
    });

    for(let item of this.data.item.purchaseVariants) {
      this.purchaseInfo.push(this.fb.group({
        sku: [item.sku, Validators.required],
        purchaseQuantity: [item.quantity, Validators.required]
      }));
    }

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
    this.homeService.purchaseEdit(this.purchaseForm.value).then((data) => {
      if(data.id) {
        this.error = false;
        this.data.isEdit = true;
        this.data.item = data;
        this.close();
      } else {
        this.error = data.detail;
      }
    }).catch((error) => {
      this.error = error;
    });
  }

  delete(i) {
    this.purchaseInfo.removeAt(i);
  }

  addPurchaseItem() {
    this.purchaseInfo.push(this.fb.group({
      sku: ['', Validators.required],
      purchaseQuantity: ['', Validators.required]
    }));
  }

  getWarehouseList() {
    this.homeService.getWarehouseList().then((data) => {
      this.warehouseList = [...data];
    });
  }

}
