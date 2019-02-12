import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit-shipping-dialog',
  templateUrl: './edit-shipping-dialog.component.html',
  styleUrls: ['../product.scss']
})

export class EditShippingDialogComponent implements OnInit {

  shippingForm: FormGroup;

  countries: any[];
  shippingMethodList: any[];
  shippingTimeList = [{
    value: '5-10',
    text: '5 - 10 business days'
  }, {
    value: '7-12',
    text: '7 - 12 business days'
  }, {
    value: '10-15',
    text: '10 - 15 business days'
  }, {
    value: '14-21',
    text:'14 - 21 business days'
  },{
    value: '21-28',
    text: '21 - 28 business days'
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
    public dialogRef: MatDialogRef<EditShippingDialogComponent>,
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

    this.countries = this.data.countries;

    this.productService.getShippingList(this.data.shipping.countryId).then((data) => {
      this.shippingMethodList = data;
    });

    let shippingTime = this.data.shipping.shippingTimeMin+ '-' + this.data.shipping.shippingTimeMax;
    let index = this.shippingTimeList.findIndex((data) => {
      if(data.value == shippingTime) {
        return true;
      }
    });
    this.shippingForm.patchValue({
      countryId: this.data.shipping.countryId,
      type: this.data.shipping.type,
      id: this.data.shipping.id,
      shippingId: this.data.shipping.shippingId,
      price: this.data.shipping.priceItem,
      checked: index > -1? false : true,
      shippingTime: index > -1? shippingTime : '0',
      shippingTimeMin: this.data.shipping.shippingTimeMin,
      shippingTimeMax: this.data.shipping.shippingTimeMax
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
    this.productService.editShipping(shipping).then((data) => {
      self.close();
      self.data.isShippingEdit = true;
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
