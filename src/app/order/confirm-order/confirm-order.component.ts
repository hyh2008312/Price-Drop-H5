import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../shared/services/order/order.service';
import { OrderListService } from '../order-list.service';
import { UserService } from '../../shared/services/user/user.service';
import {ToastComponent} from '../../shared/components/toast/toast.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['../_order.scss']
})

export class ConfirmOrderComponent implements OnInit {

  @Input() flashSaleList: any = [];
  @Input() flashSaleTime: any;
  notification: any = [];
  card: any = {};
  order: any = {
    title: '',
    mainImage: '',
    salePrice: '',
    currentPrice: '', // 计算价钱的金额
    attributes: '',
    productId: '',
    quantity: '1',
    id: '',
    shippingPrice: '',
    shippingTimeMin: '',
    shippingTimeMax: '',
    processingTimeMin: '',
    processingTimeMax: '',
    proId: '',
    flashSale: {}
  };
  address: any = {
    'id': false,
    'firstName': '',
    'lastName': '',
    'postcode': '',
    'line1': '',
    'line2': '',
    'line3': '',
    'city': '',
    'stateName': '',
    'countryName': '',
    'isDefault': false,
    'phoneNumber': '',
    'stateId': 5
  };
  isFirst: any = false; // 防止重复下单
  amin: any = 12;
  asecond: any = 13;

  addHeight: any = true;

  constructor(
    private router: Router,
    private orderListService: OrderListService,
    private orderService: OrderService,
    public snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.userService.addNavigation('Confirm Order');
    this.orderService.detail.subscribe((res) => {
      if (res) {
        this.order = res;
      } else {
        this.router.navigate([`/`]);
      }
    });

    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });

  }

  ngOnInit(): void {
    this.getNotification();
    this.getDefaultAddress();

  }
  getDefaultAddress () {
    this.orderListService.getDefaultAddress().then((res) => {
      this.address = res;
    }).catch((res) => {
      console.log(res);
    });
  }
  getNotification () {
    this.orderListService.getNotification().then((res) => {
      this.notification = res;
    }).catch((res) => {
      console.log(res);
    });
  }
  getTotalPrice (a, b) {
    return parseInt(a) + parseInt(b);
  }
  formatDate(p) {
    return new Date(new Date().getTime() + (p + 7) * 24 * 60 * 60 * 1000);
  }
  countOff (s, o) {
    if (o > 0) {
      return Math.ceil((o - s) / o * 100) + '%';
    } else {
      return '';
    }
  }
  openChoose() {
    this.router.navigate([`/order/chooseAddress/`], { queryParams: { type: 1 } });
  }
  placeOrder () {
    if (!this.address.id) {
      this.toast('Please add address first!');
      return;
    }
    if (!this.isFirst) {
      this.isFirst = true;
      const voucherId = this.card ? this.card.id : null;
      if (this.order.proId === 'direct') {
        let params = {
          vid: this.order.id,
          quantity: this.order.quantity,
          voucherId: voucherId
        };
        this.orderListService.postDirectOrder(params).then((res) => {
          if (res) {
            this.orderService.paymentOrder(res);
            this.orderService.addOrder(false);
            this.router.navigate([`/order/payment`], { replaceUrl: true });
          } else {
            this.toast('server are too busy');
          }
        }).catch((res) => {
          this.isFirst = false;
          this.toast(res)
          console.log(res);
        });
      } else if (this.order.proId === 'flash') {
        let params = {
          vid: this.order.id,
          quantity: this.order.quantity,
          voucherId: voucherId,
          flashPromotionId: this.order.flashSale.promotionId
        };
        this.orderListService.postFlashOrder(params).then((res) => {
          if (res) {
            this.orderService.paymentOrder(res);
            this.orderService.addOrder(false);
            this.router.navigate([`/order/payment`], { replaceUrl: true });
          } else {
            this.toast('server are too busy');
          }
        }).catch((res) => {
          this.isFirst = false;
          this.toast(res)
          console.log(res);
        });
      }
    }
  }

  toast(string) {
    this.snackBar.openFromComponent(ToastComponent, {
      data: {
        string: string
      },
      duration: 1000,
    });
  }
}
