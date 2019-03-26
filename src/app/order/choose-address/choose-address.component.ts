import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { OrderListService } from '../order-list.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-choose-address',
  templateUrl: './choose-address.component.html',
  styleUrls: ['../_order.scss']
})

export class ChooseAddressComponent implements OnInit {

  @Input() flashSaleList: any = [];
  @Input() flashSaleTime: any;
  addressList: any = [];
  defaultAddress: any = {};
  stu: any = true;
  asecond: any = 13;

  constructor(
    private router: Router,
    private orderListService: OrderListService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.addNavigation('Choose Address');
    this.getAddressList()
  }
  getAddressList() {
    this.orderListService.getAddressList().then((res) => {
      this.addressList = [...res]
      for (const item of this.addressList) {
        if (item.isDefault) {
          this.defaultAddress = item
        }
      }
    }).catch((res) => {
      console.log(res)
    })
  }
  chooseAddress (item) {
    if (this.stu && item.id !== this.defaultAddress.id) {
      this.defaultAddress = item;
      this.stu = false;
      this.orderListService.editDefaultAddress(item.id).then((res) => {
        this.stu = true
      }).catch((res) => {
        alert('error')
        console.log(res)
      })
    } else if (!this.stu) {
      alert('wait for minute')
    }
  }
  countOff (s, o) {
    if (o > 0) {
      return Math.ceil((o - s) / o * 100) + '%'
    } else {
      return ''
    }
  }
}
