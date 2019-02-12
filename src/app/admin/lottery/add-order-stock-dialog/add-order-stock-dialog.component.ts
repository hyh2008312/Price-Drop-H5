 import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { LotteryService } from '../lottery.service';

@Component({
  selector: 'app-lottery-add-order-stock-dialog',
  templateUrl: './add-order-stock-dialog.component.html',
  styleUrls: ['../_lottery.scss']
})

export class AddOrderStockDialogComponent implements OnInit {

  orderStockForm : FormGroup;
  sourcingSupplierList: any;

  warehouseList: any;

  supplierList: any = ['getpricedrop', '北京云海'];
  error: any = false;

  constructor(
    public dialogRef: MatDialogRef<AddOrderStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private lotteryService: LotteryService
  ) {
    this.orderStockForm = this.fb.group({
      id: [''],
      sourcingSupplier: [''],
      sourcingOrderNumber: ['', Validators.required],
      purchaseAccount: ['getpricedrop', Validators.required],
      warehouseId: [''],
    });

    this.orderStockForm.patchValue({
      id: this.data.order.id,
      sourcingOrderNumber: this.data.order.sourcingOrderNumber,
      sourcingSupplier: this.data.order.sourcingSupplier,
      purchaseAccount: this.data.order.purchaseAccount,
      warehouseId: this.data.order.warehouseId
    });

    this.getSourcingSupplierList();
    this.getWarehouseList();

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  getSourcingSupplierList() {
    this.lotteryService.getSourcingSupplierList().then((data) => {
      this.sourcingSupplierList = [...data];
      if(!this.orderStockForm.value.sourcingSupplier) {
        this.orderStockForm.patchValue({
          sourcingSupplier: this.sourcingSupplierList[0].sourcingName
        });
      }
    });
  }

  changeOrderSourcing() {
    if(this.orderStockForm.invalid) {
      return;
    }

    let self = this;
    this.lotteryService.changeOrderSourcing(this.orderStockForm.value).then((data) => {
      if(data.id) {
        self.error = false;
        self.data.isOrderStockEdit = true;
        self.data.order = data;
        self.close();
      } else {
        self.error = data.detail;
      }
    });
  }

  getWarehouseList() {
    this.lotteryService.getWarehouseList().then((data) => {
      this.warehouseList = [...data];
    });
  }

}
