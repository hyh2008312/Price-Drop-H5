import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-add-shipping-dialog',
  templateUrl: './add-shipping-dialog.component.html',
  styleUrls: ['../product.scss']
})

export class AddShippingDialogComponent implements OnInit {

  shippingForm: FormGroup;

  countries: any[];
  shippingMethodList: any[];
  shippingTimeList = [{
    value: '5-10',
    text: '5 - 10 days'
  }, {
    value: '7-14',
    text: '7 - 14 days'
  }, {
    value: '10-15',
    text: '10 - 15 days'
  }, {
    value: '14-21',
    text:'14 - 21 days'
  },{
    value: '21-28',
    text: '21 - 28 days'
  },{
    value: '0',
    text: 'other'
  }];

  shippingTypeList = [{
    name: 'Free Shipping',
    type: 'Free'
  }, {
    name: 'Standard Shipping',
    type: 'Standard'
  }, {
    name: 'Expedited Shipping',
    type: 'Expedited'
  }];

  constructor(
    public dialogRef: MatDialogRef<AddShippingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private fb: FormBuilder
  ) {

    this.shippingForm = this.fb.group({
      countryId: ['', Validators.required],
      type: ['', Validators.required],
      id: [''],
      shippingId: ['', Validators.required],
      shippingName: [''],
      price: ['', Validators.required],
      checked: [false, Validators.required],
      shippingTime: ['', Validators.required],
      shippingTimeMin: ['', Validators.required],
      shippingTimeMax: ['', Validators.required]
    });

    this.shippingForm.patchValue({
      id: this.data.productId,
    });

    this.countries = this.data.countries;

    this.productService.getShippingList(this.data.shipping.countryId).then((data) => {
      this.shippingMethodList = data;
    });

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  add() {
    if(this.shippingForm.invalid) {
      return;
    }

    let shipping = this.shippingForm.value;

    let self = this;
    this.productService.addShipping(shipping).then((data) => {
      self.close();
      self.data.isShippingAdd = true;
      self.data.shipping = data;
    });
  }

  changeShippingPrice($event) {
    this.shippingForm.patchValue({
      price: 0,
      shippingTime: 0,
      checked: false,
      shippingTimeMin: 0,
      shippingTimeMax: 0
    });
  }

  showMinAndMaxTime($event, index) {
    if(index == 5) {
      this.shippingForm.patchValue({
        checked: true
      });
    } else {
      let timeArr = this.shippingTimeList[index].value.split('-');
      this.shippingForm.patchValue({
        checked: false,
        shippingTimeMin: timeArr[0],
        shippingTimeMax: timeArr[1]
      });
    }
  }

  changeShippingMethod($event) {
    this.productService.getShippingList($event).then((data) => {
      this.shippingMethodList = data;
    });
  }


}
