import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['../_order.scss']
})

export class PaymentComponent implements OnInit {

  @Input() flashSaleList: any = [];
  @Input() flashSaleTime: any;
  notification: any = []
  ahour: any = 11;
  amin: any = 12;
  asecond: any = 13;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.addNavigation('Payment');
    this.getNotification()

  }
  getNotification () {
    this.orderService.getNotification().then((res) => {
      this.notification = res
    }).catch((res) => {
      console.log(res)
    })
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
