import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { OrderListService } from '../order-list.service';
import { UserService } from '../../shared/services/user/user.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ToastComponent} from '../../shared/components/toast/toast.component';

@Component({
  selector: 'app-track-package',
  templateUrl: './track-package.component.html',
  styleUrls: ['./_track-package.scss']
})

export class TrackPackageComponent implements OnInit {

  @Input() flashSaleList: any = [];
  @Input() flashSaleTime: any;
  id: any = '';
  defaultAddress: any = {};
  stu: any = true;
  carrierCode: any = '';
  addHeight: any = true;
  order: any = {
    orderData: {},
    trackingData: [],
  };

  constructor(
    private router: Router,
    private orderListService: OrderListService,
    public dialog: MatDialog,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    this.userService.addNavigation('Track Package');
    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getOrderTracking();
  }

  getOrderTracking () {

    this.orderListService.getOrderTracking(this.id).then((resData) => {
      this.order = resData;
    }).catch((res) => {});
  }
  toast(res) {
    this.snackBar.openFromComponent(ToastComponent, {
      data: {
        string: res
      },
      duration: 2500,
    });
  }

  copy($event) {
    this.toast('Successfully Copied!');
  }
}
