import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { OrderListService } from '../order-list.service';
import { UserService } from '../../shared/services/user/user.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ToastComponent } from '../../shared/components/toast/toast.component';

@Component({
  selector: 'app-payment-fail',
  templateUrl: './payment-fail.component.html',
  styleUrls: ['../_order.scss']
})

export class PaymentFailComponent implements OnInit {

  defaultAddress: any = {};
  stu: any = true;
  type: any = '';
  addHeight: any = true;
  constructor(
    private router: Router,
    private orderListService: OrderListService,
    public dialog: MatDialog,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    this.userService.addNavigation('Payment Fail');
    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
  }

  ngOnInit(): void {
  }
  toast(res) {
    this.snackBar.openFromComponent(ToastComponent, {
      data: {
        string: res
      },
      duration: 2500,
    });
  }
  jumpOrder() {
    this.router.navigate(['/order/orderList'], {replaceUrl: true});
  }

  jumpHome() {
    this.router.navigate(['/'], {replaceUrl: true});
  }
}
