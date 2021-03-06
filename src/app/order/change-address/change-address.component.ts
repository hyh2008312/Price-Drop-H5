import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderListService } from '../order-list.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-order-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['../_order.scss']
})

export class ChangeAddressComponent implements OnInit {

  attributeForm: FormGroup;
  address: {
    firstName: '',
    phoneNumber: '',
    postcode: '',
    line1: '',
    line2: '',
    line3: '',
    city: '',
    stateId: '',
    phoneNumberConfirm: ''
  };
  addressId: any = '';
  name: any = '';
  addHeight: any = true;
  stateName: any = 'Choose';
  stateId: any = '';
  asecond: any = 13;

  constructor(
    private router: Router,
    private orderListService: OrderListService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.attributeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      phoneNumberConfirm: ['', [Validators.required, Validators.minLength(10)]],
      postcode: ['', [Validators.required, Validators.minLength(6)]],
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      line3: ['', Validators.required],
      city: ['', Validators.required],
      stateId: ['', Validators.required]
    });
    this.userService.addNavigation('Edit Address');
    if (this.activatedRoute.snapshot.queryParams['addressId']) {
      this.addressId = this.activatedRoute.snapshot.queryParams['addressId'];
    }
    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
  }

  ngOnInit(): void {
    this.orderListService.state.subscribe((res) => {
      if (res) {
        if (this.activatedRoute.snapshot.queryParams['name'] || res.stateName) {
          this.stateName = this.activatedRoute.snapshot.queryParams['name'] || res.stateName;
          this.stateId = this.activatedRoute.snapshot.queryParams['id'] || res.stateId;
        }
        this.attributeForm.patchValue({
          firstName : res.firstName,
          phoneNumber : res.phoneNumber,
          phoneNumberConfirm : res.phoneNumber,
          postcode : res.postcode,
          line1 : res.line1,
          line2 : res.line2,
          line3 : res.line3,
          city : res.city,
          stateId : this.stateId,
        });
      }
    });
  }
  chooseState () {
    this.orderListService.addState(this.attributeForm.value);
    this.router.navigate([`/order/cityList`], {queryParams: {source: 0 }});
  }
  save () {
    if (this.addressId) {
      this.orderListService.editAddress(this.addressId, this.attributeForm.value).then((res) => {
        this.router.navigate([`/order/chooseAddress`]);
      }).catch((res) => {
        console.log(res);
      });
    } else {
      this.orderListService.postAddress(this.attributeForm.value).then((res) => {
        this.router.navigate([`/order/chooseAddress`], {queryParams: {type: 1 }});
      }).catch((res) => {
        console.log(res);
      });
    }
  }
}
