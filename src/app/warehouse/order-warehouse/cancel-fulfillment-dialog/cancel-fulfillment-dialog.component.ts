import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { OrderService } from '../order.service';

@Component({
  selector: 'app-warehouse-order-cancel-fulfillment-dialog',
  templateUrl: './cancel-fulfillment-dialog.component.html',
  styleUrls: ['../_order.scss']
})

export class CancelFulfillmentDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<CancelFulfillmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService
  ) {
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  cancel() {
    let order = {
      id: this.data.order.id
    };

    let self = this;
    this.orderService.cancelOrder(order).then((data) => {
      self.close();
      self.data.isOrderCancel = true;
      self.data.order = data;
    });
  }

}
