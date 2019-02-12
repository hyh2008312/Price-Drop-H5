import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-deny-request-dialog',
  templateUrl: './deny-request-dialog.component.html',
  styleUrls: ['../order.scss']
})

export class DenyRequestDialogComponent implements OnInit {

  orderReturnForm : FormGroup;
  formErr: any = false;

  constructor(
    public dialogRef: MatDialogRef<DenyRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService,
    private fb: FormBuilder
  ) {
    this.orderReturnForm = this.fb.group({
      reason: ['', Validators.required]
    });


  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  denyReturnRequest() {
    if(this.orderReturnForm.invalid) {
      return;
    }
    let order = {
      id: this.data.order.id,
      denyReason: this.orderReturnForm.value.reason
    };
    let self = this;
    self.orderService.denyReturnOrderRequest(order).then((data) => {
      self.formErr = false;
      self.close();
      self.data.isRequestDeny = true;
      self.data.order = data;
    }).catch((data) => {
      self.formErr = data;
    });
  }
}
