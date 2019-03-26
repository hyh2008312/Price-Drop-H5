import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  notification: any = [];
  order: any = {
    cancelTime: '2019-03-27T04:12:36.158417Z',
    lines: [
      {
        attributes: '',
        costPrice: 455,
        id: 74682,
        mainImage: '',
        paymentPrice: '',
        priceExclTax: '',
        priceInclTax: '',
        productId: 7689,
        quantity: 1,
        shippingExclTax: '',
        title: '',
        totalTax: '',
        unitTax: '',
      }
    ]
  };
  orderId: any = '';
  ahour: any = 11;
  amin: any = 12;
  asecond: any = 13;

  constructor(
    private router: Router,
    private orderListService: OrderListService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.addNavigation('Order Detail');
    this.getNotification()

  }
  getNotification () {
    this.orderId = this.activatedRoute.snapshot.params['id'];
    // this.orderListService.getOrder(this.orderId).then((res) => {
    //   this.order = res
    // }).catch((res) => {
    //   console.log(res)
    // })
  }
  countOff (s, o) {
    if (o > 0) {
      return Math.ceil((o - s) / o * 100) + '%'
    } else {
      return ''
    }
  }
}
