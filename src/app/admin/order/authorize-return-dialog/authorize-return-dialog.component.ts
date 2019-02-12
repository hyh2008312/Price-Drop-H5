import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-authorize-return-dialog',
  templateUrl: './authorize-return-dialog.component.html',
  styleUrls: ['../order.scss']
})

export class AuthorizeReturnDialogComponent implements OnInit {

  shippingForm : FormGroup;
  countries:any;
  states: any;
  formErr: any = false;

  modified: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AuthorizeReturnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private orderService: OrderService
  ) {

    this.orderService.getCountryList().then((data) => {
      this.countries = data;
    });

    this.shippingForm = this.fb.group({
      ran: ['', Validators.required],
      firstName: ['', Validators.required],
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      city: ['', Validators.required],
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      postcode: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });

    if(this.data.order.status == 'Authorized') {
      this.shippingForm.patchValue({
        ran: this.data.order.ran,
        firstName: this.data.order.supplierAddress.firstName,
        lastName: this.data.order.supplierAddress.lastName,
        line1: this.data.order.supplierAddress.line1,
        line2: this.data.order.supplierAddress.line2,
        city: this.data.order.supplierAddress.city,
        countryId: this.data.order.supplierAddress.country.id,
        stateId: this.data.order.supplierAddress.state.id,
        postcode: this.data.order.supplierAddress.postcode,
        phoneNumber: this.data.order.supplierAddress.phoneNumber,
      });
      this.changeShippingState(this.data.order.supplierAddress.country.id);
      this.modified = true;
    }
  }

  changeShippingState($event) {
    let cid = $event;
    this.orderService.getStateList({
      cid
    }).then((data)=> {
      this.states = data;
    });
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  editRAN() {
    this.modified = false;
  }

  authorization() {
    if(this.shippingForm.invalid) {
      return;
    }
    let order = this.shippingForm.value;
    order.lastName = '';
    order.id = this.data.order.id;
    let self = this;
    self.orderService.authorizeReturnOrderRequest(order).then((data) => {
      self.formErr = false;
      self.data.order = data;
      self.data.isAuthorized = true;
      self.modified = true;
    }).catch((data) => {
      self.formErr = data;
    });
  }

}
