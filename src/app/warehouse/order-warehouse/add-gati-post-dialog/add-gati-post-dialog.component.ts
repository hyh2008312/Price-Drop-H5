 import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { OrderService } from '../order.service';

@Component({
  selector: 'app-warehouse-order-add-gati-post-dialog',
  templateUrl: './add-gati-post-dialog.component.html',
  styleUrls: ['../_order.scss']
})

export class AddGatiPostDialogComponent implements OnInit {

  trackingForm : FormGroup;
  depotCode = [{
    name: 'Shanghai',
    code: 'SHA'
  }, {
    name: 'Shenzhen',
    code: 'SZX'
  }];

  YesOrNo = [{
    text: "Yes",
    value: 'battery'
  }, {
    text: 'No',
    value: 'general'
  }];

  currencyRate: any = 74;

  warehouseList: any;
  error: any = false;

  get goods() { return this.trackingForm.get('goods') as FormArray; }

  constructor(
    public dialogRef: MatDialogRef<AddGatiPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private orderService: OrderService
  ) {

    this.getWarehouseList();

    this.trackingForm = this.fb.group({
      depotCode: ['', Validators.required],
      goods: this.fb.array([]),
      notes: [''],
      serviceCode: ['general', Validators.required],
      domesticExp: [''],
      warehouseId: ['']
    });

    this.addOrderList();
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

    let self = this;
    this.orderService.changeGATITrackingInformation(this.trackingForm.value).then((data) => {

      if(data && data.detail) {
        self.error = data.detail;
      } else {
        self.close();
        self.data.isEdit = true;
        self.error = false;
      }
    });
  }

  addOrderList() {
    this.goods.push(this.fb.group({
      orderNumber: ['', Validators.required],
      declaredValue: ['', Validators.required]
    }));
  }

  deleteOrderTrackingObject(i) {
    this.goods.removeAt(i);
  }

  changeOrder($event, p) {
    this.orderService.getOrderNumberCost({
      order_number: $event
    }).then((data) => {
      if(data) {
        p.patchValue({
          declaredValue: data.tariffsPrice
        });
      }
    });
  }

  getWarehouseList() {
    this.orderService.getWarehouseList().then((data) => {
      this.warehouseList = [...data];
      this.trackingForm.patchValue({
        warehouseId: this.warehouseList[0].id
      })
    });
  }

}
