import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderListService } from '../order-list.service';
import { UserService } from '../../shared/services/user/user.service';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-order-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['../_order.scss']
})

export class EditAddressComponent implements OnInit {

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
  id: any = '';
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
    private userService: UserService,
    public snackBar: MatSnackBar
  ) {
    this.attributeForm = this.fb.group({
      id: [''],
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

    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.orderListService.getOrderAddress({
      id: this.id
    }).then((res) => {
      if (res) {
        this.stateName = res.state;
        this.attributeForm.patchValue({
          id: this.id,
          firstName : res.username,
          phoneNumber : res.phoneNumber,
          phoneNumberConfirm : res.phoneNumber,
          postcode : res.postcode,
          line1 : res.line1,
          line2 : res.line2,
          line3 : res.line3,
          city : res.city
        });

        this.orderListService.getCityList().then((res) => {
          for(let item of res) {
            if(item.name == this.stateName) {
              this.stateId = item.id;
            }
          }
          if (this.activatedRoute.snapshot.queryParams['name']) {
            this.stateName = this.activatedRoute.snapshot.queryParams['name'];
            this.stateId = this.activatedRoute.snapshot.queryParams['id'];
          }
          this.attributeForm.patchValue({
            stateId: this.stateId
          });
        });
      }
    });

  }
  chooseState () {
    this.orderListService.addState(this.attributeForm.value);
    this.router.navigate([`/order/cityList`], {queryParams: {source: this.id }, replaceUrl: true});
  }
  save () {
    if(this.attributeForm.invalid) {
      return;
    }
    this.orderListService.editOrderAddress(this.attributeForm.value).then((res) => {
      this.router.navigate([`/order/orderDetail/${this.id}`], {replaceUrl: true});
    }).catch((res) => {
      this.toast(res);
    });
  }
  toast(string) {
    this.snackBar.openFromComponent(ToastComponent, {
      data: {
        string: string
      },
      duration: 2500,
    });
  }
}
