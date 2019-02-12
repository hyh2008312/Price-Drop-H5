 import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { OrderService } from '../order.service';

@Component({
  selector: 'app-warehouse-order-add-order-stock-dialog',
  templateUrl: './add-order-stock-dialog.component.html',
  styleUrls: ['../_order.scss']
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
    private orderService: OrderService
  ) {
    this.orderStockForm = this.fb.group({
      id: [''],
      sourcingSupplier: [''],
      sourcingOrderNumber: ['', Validators.required],
      purchaseAccount: ['getpricedrop', Validators.required],
      warehouseId: [1, Validators.required],
      purchasePrice: ['', Validators.required],
      purchaseUrl: ['', Validators.required]
    });

    this.orderStockForm.patchValue({
      id: this.data.order.id,
      sourcingOrderNumber: this.data.order.sourcingOrderNumber,
      sourcingSupplier: this.data.order.sourcingSupplier,
      purchaseAccount: this.data.order.purchaseAccount,
      warehouseId: this.data.order.warehouseId || 1,
      purchasePrice: this.data.order.purchasePrice,
      purchaseUrl: this.data.order.purchaseUrl
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
    this.orderService.getSourcingSupplierList().then((data) => {
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
    this.orderService.changeOrderSourcing(this.orderStockForm.value).then((data) => {
      if(data && data.id) {
        self.error = false;
        self.data.isOrderStockEdit = true;
        self.data.order = data;
        self.close();
      } else {
        this.error =  data.detail;
      }
    }).catch((data) => {
      this.error = data;
    });
  }

  getWarehouseList() {
    this.orderService.getWarehouseList().then((data) => {
      this.warehouseList = [...data];
    });
  }

}
