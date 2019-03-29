import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  user: any;
  codSrc: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderListService: OrderListService,
    private userService: UserService,
    private orderService: OrderService
  ) {
    this.orderService.paymentDetail.subscribe((res) => {
      if (res) {
        this.order = res;
      } else {
        this.router.navigate([`/`]);
      }
    });

    this.userService.currentUser.subscribe((res) => {
      this.user = res;
    });
  }

  ngOnInit(): void {
    this.userService.addNavigation('Payment');
    this.getNotification();
    this.getBalance();

  }
  getNotification () {
    this.orderListService.getNotification().then((res) => {
      this.notification = res;
    }).catch((res) => {
      console.log(res);
    });
  }
  getBalance () {
    this.orderListService.getBalance().then((res) => {
      this.balance = res.amount;
      if (res.amount > 0 && this.order.paymentAmount > 0) {
        this.isShowBalance = true;
      }
    }).catch((res) => {
      console.log(res);
    });
  }
  payNow () {
    console.log(this.checkBalance);
    this.startRazorypay();
  }
  countOff (s, o) {
    if (o > 0) {
      return Math.ceil((o - s) / o * 100) + '%';
    } else {
      return '';
    }
  }

  startRazorypay() {

    let params = {
      orderId: this.order.id,
      bonus: this.checkBalance ? this.checkBalance : null
    };

    this.orderListService.getRazorpay(params).then((res) => {
      console.log(res);
      const price = res.amount.split('.');
      const payAmount = price[0] + price[1];
      if (res.amount <= 0) {
        return;
      }

      let options = {
        "key": 'rzp_live_S1L7BaoXwjfcux',
        "amount": payAmount, /// The amount is shown in currency subunits. Actual amount is ₹599.
        "name": res.order.lines[0].title,
        "order_id": res.razorpayOrderId, // Pass the order ID if you are using Razorpay Orders.
        "currency": 'INR', // Optional. Same as the Order currency
        "description": 'Order#: ' + res.orderNumber,
        "image": res.order.lines[0].mainImage,
        "handler": (response) => {
          let params = {
            orderId: res.order.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            bonus: this.checkBalance ? this.checkBalance : null
          };

          this.orderListService.checkRazorpay(params).then((res) => {
            this.router.navigate(['/order/success']);
          }).catch(() => {

          });
        },
        "prefill": {
          "contact": this.user.defaultAddress.phoneNumber,
          "email": this.user.email
        },
        "theme": {
          "color": "#EF8A31"
        }
      };

      let rzp1:any = new (<any>window).Razorpay(options);
      rzp1.open();
    });
  }
}
