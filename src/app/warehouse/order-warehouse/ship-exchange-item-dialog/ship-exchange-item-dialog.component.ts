import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrderService } from '../order.service';

@Component({
  selector: 'app-warehouse-order-ship-exchange-item-dialog',
  templateUrl: './ship-exchange-item-dialog.component.html',
  styleUrls: ['../_order.scss']
})

export class ShipExchangeItemDialogComponent implements OnInit {

  shippingForm : FormGroup;
  formErr: any = false;
  modified: boolean = false;

  shippingList: any;

  constructor(
    public dialogRef: MatDialogRef<ShipExchangeItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private orderService: OrderService
  ) {
    this.orderService.getShippingList(this.data.order.line.shippingAddress.country.id).then((data) => {
      this.shippingList = data;
    });
    this.shippingForm = this.fb.group({
      exchangeShippingProvider: ['', Validators.required],
      exchangeShippingNumber: ['', Validators.required],
      exchangeShippingUrl: ['', Validators.required]
    });

    if(this.data.order.line.exchangeShippingNumber) {
      this.shippingForm.patchValue({
        exchangeShippingProvider: this.data.order.line.exchangeShippingProvider,
        exchangeShippingNumber: this.data.order.line.exchangeShippingNumber,
        exchangeShippingUrl: this.data.order.line.exchangeShippingUrl
      });

      this.modified = true;

    }
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  changeShippingMethod() {
    if(this.shippingForm.invalid) {
      return;
    }
    let order = this.shippingForm.value;
    order.id = this.data.order.id;
    let self = this;
    self.orderService.changeShippingMethod(order).then((data) => {
      self.formErr = false;
      self.data.order = data;
      self.data.isExchange = true;
    }).catch((data) => {
      self.formErr = data;
    });
  }

  editShippingMethod() {
    this.modified = false;
  }

}
