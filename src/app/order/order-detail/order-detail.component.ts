import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { OrderListService } from '../order-list.service';
import { UserService } from '../../shared/services/user/user.service';
import {MatDialog} from '@angular/material';
import {CancelOrderDialogComponent} from '../cancel-order-dialog/cancel-order-dialog.component';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
import {OrderService} from '../../shared/services/order/order.service';

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
  bottomReason: any = '';
  addHeight: any = true;
  showDetailBtn: any = false;
  ahour: any = 11;
  amin: any = 12;
  asecond: any = 13;

  constructor(
    private router: Router,
    private orderListService: OrderListService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog,
    private orderService: OrderService

  ) {
    this.userService.addNavigation('Order Detail');
    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
  }

  ngOnInit(): void {
    this.getOrder();
  }
  getOrder () {
    this.orderId = this.activatedRoute.snapshot.params['id'];
    this.orderListService.getOrder(this.orderId).then((res) => {
      this.order = res;
      if (this.order.orderStatus == 'Canceled') {
        this.showDetailBtn = true;
      }
    }).catch((res) => {
      console.log(res);
    });
  }
  openCancelOrder($event?:any) {
    // if () {
      let dialogRef = this.dialog.open(CancelOrderDialogComponent, {
        data: {
          id: this.activatedRoute.snapshot.params['id'],
          isEdit: false
        },
        position: {
          bottom: '0',
          left: '0'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(dialogRef.componentInstance.data.isEdit) {
          if (dialogRef.componentInstance.data.parmas=='Audit canceled') {
            this.bottomReason = dialogRef.componentInstance.data.parmas;
          } else if (dialogRef.componentInstance.data.parmas=='showDetailBtn') {
            this.showDetailBtn = true;
          }
        }
      });
  }
  deleteOrder(index) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        content: 'Are you sure you want to delete this order？',
        type: 'order',
        id: this.orderId
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(dialogRef.componentInstance.data.stu == 'ok') {
        this.router.navigate([`/order/orderList`], { replaceUrl: true });
      }
    });
  }
  formatMinDate (order) {
    return new Date(new Date().getTime() + (order.shippingTimeMin + order.processingTimeMax) * 24 * 60 * 60 * 1000);
  }

  formatMaxDate (order) {
    return new Date(new Date().getTime() + (order.shippingTimeMax + order.processingTimeMax) * 24 * 60 * 60 * 1000);
  }

  buyProduct() {
    this.router.navigate([`/goodsdetail/${this.order.lines[0].productId}`]);
  }

  tracking() {
    this.router.navigate([`/order/trackPackage/${this.order.id}`]);
  }

  payNow() {
    this.orderService.paymentOrder(this.order);
    this.router.navigate([`/order/payment`]);
  }

  editAddress() {
    this.router.navigate([`/order/editAddress/${this.order.id}`]);
  }
}
