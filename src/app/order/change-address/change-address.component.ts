import {Component, Input, OnInit, OnChanges} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderListService } from '../order-list.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['../_order.scss']
})

export class ChangeAddressComponent implements OnInit {

  @Input() flashSaleList: any = [];
  @Input() flashSaleTime: any;
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
  name: any = '';
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
      firstName: ['', [Validators.required, Validators.maxLength(15)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
      phoneNumberConfirm: ['', [Validators.required, Validators.maxLength(10)]],
      postcode: ['', [Validators.required, Validators.maxLength(6)]],
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      line3: ['', Validators.required],
      city: ['', Validators.required],
      stateId: ['', Validators.required]
    });
    this.userService.addNavigation('Edit Address');
  }

  ngOnInit(): void {
    this.orderListService.state.subscribe((res) => {
      if (res) {
        console.log(res);
        this.attributeForm.patchValue({
          firstName : res.name,
          phoneNumber : res.phoneNumber,
          phoneNumberConfirm : res.phoneNumberConfirm,
          postcode : res.postcode,
          line1 : res.line1,
          line2 : res.line2,
          line3 : res.line3,
          city : res.city,
          stateId : this.activatedRoute.snapshot.queryParams['id'],
        });
        if (this.activatedRoute.snapshot.queryParams['name']) {
          this.stateName = this.activatedRoute.snapshot.queryParams['name'];
          this.stateId = this.activatedRoute.snapshot.queryParams['id'];
        }
      }
    });
  }
  chooseState () {
    this.orderListService.addState(this.attributeForm.value);
    this.router.navigate([`/order/cityList`]);
  }
  save () {
    this.orderListService.postAddress(this.attributeForm.value).then((res) => {
      console.log(res);
    }).catch((res) => {
      console.log(res);
    })
   // console.log(this.attributeForm.value);
  }
}
