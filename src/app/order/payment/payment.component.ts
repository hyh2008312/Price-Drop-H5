import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { OrderListService } from '../order-list.service';
import { OrderService } from '../../shared/services/order/order.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['../_order.scss']
})

export class PaymentComponent implements OnInit {

  @Input() flashSaleList: any = [];
  @Input() flashSaleTime: any;
  notification: any = [];
  balance: any ;
  isShowBalance: any ;
  checkBalance: any = false ;
  order: any = {};
  asecond: any = 13;

  constructor(
    private router: Router,
    private orderListService: OrderListService,
    private userService: UserService,
    private orderService: OrderService
  ) {
    this.orderService.paymentDetail.subscribe((res) => {
      if (res) {
        this.order = res
      } else {
        this.router.navigate([`/`]);
      }
    })
  }

  ngOnInit(): void {
    this.userService.addNavigation('Payment');
    this.getNotification();
    this.getBalance();

  }
  getNotification () {
    this.orderListService.getNotification().then((res) => {
      this.notification = res
    }).catch((res) => {
      console.log(res)
    })
  }
  getBalance () {
    this.orderListService.getBalance().then((res) => {
      this.balance = res.amount;
      if (res.amount > 0 && this.order.paymentAmount > 0) {
        this.isShowBalance = true;
      }
    }).catch((res) => {
      console.log(res)
    })
  }
  payNow () {
    console.log(this.checkBalance)
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
