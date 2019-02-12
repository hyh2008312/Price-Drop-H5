import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-approve-cancel-dialog',
  templateUrl: './approve-cancel-dialog.component.html',
  styleUrls: ['../order.scss']
})

export class ApproveCancelDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<ApproveCancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService
  ) {
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  approved() {
    let order = {
      id: this.data.order.id,
      status: 'Approved'
    };

    let self = this;
    this.orderService.auditCancelOrder(order).then((data) => {
      self.close();
      self.data.isOrderCancel = true;
      self.data.order = data;
    });
  }

  disapproved() {
    let order = {
      id: this.data.order.id,
      status: 'Disapproved'
    };

    let self = this;
    this.orderService.auditCancelOrder(order).then((data) => {
      self.close();
      self.data.isOrderCancel = true;
      self.data.order = data;
    });
  }

}
