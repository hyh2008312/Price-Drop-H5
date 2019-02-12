 import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { OrderService } from '../order.service';

@Component({
  selector: 'app-warehouse-order-add-order-out-stock-dialog',
  templateUrl: './add-order-out-stock-dialog.component.html',
  styleUrls: ['../_order.scss']
})

export class AddOrderOutStockDialogComponent implements OnInit {

  orderStockForm : FormGroup;

  notesList: any = [
    'SKU没库存，可换其他颜色 － Color not available & Suggest to choose other color',
    '产品已停售，选择其他产品 － Product not available & Suggest to choose different product'
  ];
  error: any = false;

  constructor(
    public dialogRef: MatDialogRef<AddOrderOutStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private orderService: OrderService
  ) {
    this.orderStockForm = this.fb.group({
      id: [''],
      sourcingNote: ['', Validators.required]
    });

    this.orderStockForm.patchValue({
      id: this.data.order.id,
      sourcingNote: this.data.order.sourcingOrderNumber
    });

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  changeOrderSourcing() {
    if(this.orderStockForm.invalid) {
      return;
    }

    let self = this;
    this.orderService.editOrderOutStock(this.orderStockForm.value).then((data) => {
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

}
