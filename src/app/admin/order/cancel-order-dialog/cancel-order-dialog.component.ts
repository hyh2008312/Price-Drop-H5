import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-cancel-order-dialog',
  templateUrl: './cancel-order-dialog.component.html',
  styleUrls: ['../order.scss']
})

export class CancelOrderDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<CancelOrderDialogComponent>,
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
