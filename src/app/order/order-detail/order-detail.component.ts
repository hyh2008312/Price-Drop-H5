import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { OrderListService } from '../order-list.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['../_order.scss']
})

export class OrderDetailComponent implements OnInit {

  @Input() flashSaleList: any = [];
  @Input() flashSaleTime: any;
  notification: any = []
  ahour: any = 11;
  amin: any = 12;
  asecond: any = 13;

  constructor(
    private router: Router,
    private orderService: OrderListService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.addNavigation('Order Detail');
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
}
