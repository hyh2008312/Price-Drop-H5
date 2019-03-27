import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { OrderListService } from '../order-list.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['../_order.scss']
})

export class OrderListComponent implements OnInit {
  loading: boolean = false;
  addHeight: any = true;
  canRun: any = true;
  page: any = 1;
  pageSize: any = 1;
  value = 36;
  activeTop: any = null;
  ordertList: any;
  topChannel: any = [
    {
      name: 'All',
      value: null
    }, {
      name: 'Paid',
      value: 'Confirmed'
    }, {
      name: 'Packing',
      value: 'Preparing'
    }, {
      name: 'Shipped',
      value: 'Shipped'
    }, {
      name: 'Completed',
      value: 'Delivered'
    },

  ];

  asecond: any = 13;

  constructor(
    private router: Router,
    private orderListService: OrderListService,
    private userService: UserService
  ) {
    this.userService.addNavigation('My Orders');

    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
  }

  ngOnInit(): void {
    this.getOrderList();

  }
  getOrder() {
    if (!this.canRun) {
      return
    }
    this.canRun = false;
    setTimeout( () => {
      this.canRun = true;
      this.getOrderList();
    }, 300 );
  }
  getOrderList() {
    if (this.canRun) {
      let parmas = {
        'page' : this.page,
        'pageSize' : this.pageSize,
        'version' : 1,
        'status' : this.activeTop,
      };
      if(this.page == 1) {
        this.ordertList = [];
      }
      this.orderListService.getOrderList(parmas).then((res) => {
        // console.log(res)
        this.ordertList = this.ordertList.concat(res.results);
        this.page++;
        this.loading = false;
      }).catch((res) => {
        this.loading = false;
      })
    }

  }
  selChannel (index) {
    this.activeTop = this.topChannel[index].value;
    this.page = 1;
    this.ordertList = [];
    this.getOrderList();
  }
  formatDate(p) {
    return new Date(p).getTime();
  }
  onUp(ev) {
    console.log('scrolled up!', ev);
  }

  onScrollDown (ev) {
    this.loading = true;
    this.getOrder();
  }

}
