import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { OrderListService } from '../order-list.service';
import { OrderService } from '../../shared/services/order/order.service';
import { UserService } from '../../shared/services/user/user.service';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ToastComponent} from '../../shared/components/toast/toast.component';
import {CancelOrderDialogComponent} from '../cancel-order-dialog/cancel-order-dialog.component';


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
  orderList: any = [];
  topChannel: any = [
    {
      name: 'All',
      value: null
    }, {
      name: 'Confirmed',
      value: 'Paid'
    }, {
      name: 'Preparing',
      value: 'Packing'
    }, {
      name: 'Shipped',
      value: 'Shipped'
    }, {
      name: 'Delivered',
      value: 'Completed'
    },

  ];

  asecond: any = 13;

  constructor(
    private router: Router,
    private orderListService: OrderListService,
    public snackBar: MatSnackBar,
    private orderService: OrderService,
    public dialog: MatDialog,
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
    setTimeout(() => {
      this.canRun = true;
      this.getOrderList();
    }, 300);
  }
  getOrderList() {
    if (this.canRun) {
      let parmas = {
        'page' : this.page,
        'pageSize' : this.pageSize,
        'version' : 1,
        'status' : this.activeTop,
      };
      this.orderListService.getOrderList(parmas).then((res) => {
        // console.log(res)
        this.orderList = this.orderList.concat(res.results);
        this.page++;
        this.loading = false;
      }).catch((res) => {
        this.loading = false;
      });
    }

  }
  selChannel (index) {
    this.activeTop = this.topChannel[index].value;
    this.page = 1;
    this.orderList = [];
    this.getOrderList();
  }
  payNow(i) {
    this.orderService.paymentOrder(i);
    this.router.navigate([`/order/payment`]);
  }
  buyProduct(i) {
    console.log(i)
    this.router.navigate([`/goodsdetail/${i.lines[0].productId}`]);
  }
  cancel(i,index) {
    let dialogRef = this.dialog.open(CancelOrderDialogComponent, {
      data: {
        order: i,
        topType: this.activeTop,
        isEdit: false
      },
      position: {
        bottom: '0',
        left: '0'
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(dialogRef.componentInstance.data.isEdit) {
        if (dialogRef.componentInstance.data.params == 'Audit canceled') {
          this.orderList[index].orderStatus = 'Audit canceled';
          this.toast('Your order cancellation request has been submitted for review.');
        } else {
          if (this.activeTop == null) {
            this.orderList[index].orderStatus = 'Canceled';
            this.toast('Cancelled successfully.');
          } else {
            this.orderList.splice(index, 1);
            this.toast('Cancelled successfully.');
          }
        }
        this.orderList[index].orderStatus = 'Canceled';
      }

    });
  }
  deleteOrder(i, index) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        content: 'Are you sure you want to delete this order？',
        type: 'order',
        id: i.id
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (dialogRef.componentInstance.data.stu === 'ok') {
        this.orderList.splice(index, 1);
      }
    });
  }
  toast(string) {
    this.snackBar.openFromComponent(ToastComponent, {
      data: {
        string: string
      },
      duration: 500,
    });
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
