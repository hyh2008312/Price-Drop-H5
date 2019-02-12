import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-issue-refund-dialog',
  templateUrl: './issue-refund-dialog.component.html',
  styleUrls: ['../order.scss']
})

export class IssueRefundDialogComponent implements OnInit {

  moneyForm : FormGroup;
  formErr: any = false;
  modified: boolean = false;
  totalRefund: any = 0;

  constructor(
    public dialogRef: MatDialogRef<IssueRefundDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private orderService: OrderService
  ) {
    this.moneyForm = this.fb.group({
      amount: ['', Validators.required],
      point: [true, Validators.required]
    });
    if(this.data.order) {
      this.totalRefund = this.data.order.paidAmount - this.data.order.refundAmount;
      this.moneyForm.patchValue({
        amount: this.totalRefund
      });

    }
  }

  changeNumber($event) {
    if($event > this.totalRefund) {
      this.moneyForm.patchValue({
        amount: this.totalRefund
      });
    }
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  refund() {
    if(this.moneyForm.invalid) {
      return;
    }
    let order = this.moneyForm.value;
    order.orderId = this.data.order.id;
    let self = this;
    self.orderService.refund(order).then((data) => {
      self.formErr = false;
      self.data.order = data;
      self.data.isRefund = true;
    }).catch((data) => {
      self.formErr = data;
    });
  }

}
