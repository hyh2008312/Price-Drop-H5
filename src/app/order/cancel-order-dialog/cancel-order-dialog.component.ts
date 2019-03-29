import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { OrderListService } from '../order-list.service';
import { ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {GuardLinkService} from '../../shared/services/guard-link/guard-link.service';
import {ToastComponent} from '../../shared/components/toast/toast.component';



@Component({
  selector: 'app-cancel-order-dialog',
  templateUrl: './cancel-order-dialog.component.html',
  styleUrls: ['./_cancel-order-dialog.scss']
})

export class CancelOrderDialogComponent implements OnInit {
  reason = [
    'I need to change my order',
    'Find alternative item somewhere else',
    'Order shipment delayed',
    'I don’t want it anymore',
    'Other'
  ];
  selReason: any = 0;
  orderId: any;
  type: any;
  order: any;
  topType: any;
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private guardLinkService: GuardLinkService,
    public dialogRef: MatDialogRef<CancelOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar,
    private orderListService: OrderListService,
  ) {
    this.auth.isOnlyAuthorized().subscribe((res) => {
      if (res) {
        // this.isLogin = true;
      }
    });
  }

  ngOnInit(): void {
    if (this.data.order) {
      this.orderId = this.data.order.id;
      this.order = this.data.order;
      this.type = 'orderList';  // 从orderList 进入
    } else if(this.data.id) {
      this.orderId = this.data.id;
      this.type = 'orderDetail';  // 从orderDetail 进入
    }
  }
  selItem(i) {
    this.selReason = i;
  }
  confirm (res) {
    let params = {
      reason: this.reason[this.selReason]
    }
    this.orderListService.cancelOrder(this.orderId, params).then((res) => {
      if (res.orderStatus === 'Audit canceled') {
        this.data.parmas = 'Audit canceled';
      } else {
        this.data.parmas = 'showDetailBtn';
        this.toast('Cancelled successfully.');
      }
      this.close();
    }).catch((res) => {
      console.log(res);
    });
    // this.$fetch({
    //   method: 'PUT', // 大写
    //   url: `${baseUrl}/order/customer/cancel/${this.cancelId}/`,
    //   data: {
    //     reason: this.reason[this.reasonActive]
    //   },
    //   header: {
    //     needAuth: true
    //   }
    // }).then(resData => {
    //   if (resData.orderStatus == 'Audit canceled') {
    //     this.order[this.cancelIndex].orderStatus = 'Audit canceled';
    //     this.$notice.toast('Your order cancellation request has been submitted for review.');
    //   } else {
    //     if (this.index == '0') {
    //       this.order[this.cancelIndex].orderStatus = 'Canceled';
    //       this.$notice.toast('Cancelled successfully.');
    //     } else {
    //       this.order.splice(this.cancelIndex, 1);
    //       this.$notice.toast('Cancelled successfully.');
    //     }
    //   }
    // }, error => {
    //   this.$notice.toast({
    //     message: error.errorMsg
    //   });
    // })
  }
  cancel() {
    this.close();
  }
  toast(string) {
    this.snackBar.openFromComponent(ToastComponent, {
      data: {
        string: string
      },
      duration: 1000,
    });
  }
  close(): void {
    this.dialogRef.close();
  }
}
