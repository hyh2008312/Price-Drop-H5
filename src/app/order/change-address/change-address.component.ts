import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  name: any = '';
  amin: any = 12;
  asecond: any = 13;

  constructor(
    private router: Router,
    private orderService: OrderListService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.attributeForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      pinCode: ['', Validators.required],
      house: ['', Validators.required],
      street: ['', Validators.required],
      landMark: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });
    this.userService.addNavigation('Edit Address');
  }

  ngOnInit(): void {
  }
  save () {
   console.log(this.attributeForm.value)
  }
}
