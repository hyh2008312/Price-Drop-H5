import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
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
  ahour: any = 11;
  amin: any = 12;
  asecond: any = 13;

  constructor(
    private router: Router,
    private orderService: OrderListService,
    private userService: UserService
  ) {}

  ngOnInit():void {
    this.userService.addNavigation('Edit Address');
  }
  countOff (s, o) {
    if (o > 0) {
      return Math.ceil((o - s) / o * 100) + '%'
    } else {
      return ''
    }
  }
  countPrice (s, o) {
    if (o > 0) {
      return Math.floor(s * (o / 100))  // 解决多一块钱的问题
    } else {
      return ''
    }
  }
}
