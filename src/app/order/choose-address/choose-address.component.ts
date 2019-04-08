import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { OrderListService } from '../order-list.service';
import { UserService } from '../../shared/services/user/user.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ToastComponent} from '../../shared/components/toast/toast.component';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-choose-address',
  templateUrl: './choose-address.component.html',
  styleUrls: ['../_order.scss']
})

export class ChooseAddressComponent implements OnInit {

  @Input() flashSaleList: any = [];
  @Input() flashSaleTime: any;
  addressList: any = [];
  defaultAddress: any = {};
  stu: any = true;
  type: any = '';
  addHeight: any = true;
  asecond: any = 13;

  constructor(
    private router: Router,
    private orderListService: OrderListService,
    public dialog: MatDialog,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    this.userService.addNavigation('Choose Address');
    if (this.activatedRoute.snapshot.queryParams['type']) {
      this.type = this.activatedRoute.snapshot.queryParams['type'];
    }
    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
  }

  ngOnInit(): void {
    this.getAddressList();
  }
  getAddressList() {
    this.orderListService.getAddressList().then((res) => {
      this.addressList = [...res]
      for (const item of this.addressList) {
        if (item.isDefault) {
          this.defaultAddress = item;
        }
      }
    }).catch((res) => {
      console.log(res);
    });
  }
  chooseAddress (item) {
    if (this.stu && item.id !== this.defaultAddress.id) {
      this.defaultAddress = item;
      this.stu = false;
      this.orderListService.editDefaultAddress(item.id).then((res) => {
        this.stu = true;
        if (this.type == 1) {  //  代表从确认订单页面跳转到本页面的
          this.router.navigate([`/order/confirmOrder`]);
        }
      }).catch((res) => {
        this.openSnackBar(res);
      });
    } else if (!this.stu) {
      this.openSnackBar('wait for minute');
    }
  }
  edit(i) {
    this.orderListService.addState(i);
    this.router.navigate([`/order/changeAddress`], {queryParams: { addressId: i.id} });
  }
  addNew() {
    this.router.navigate([`/order/changeAddress`]);
  }
  del(i, index) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        content: 'Do you want to delete this address? ',
        id: i.id,
        type: 'address'
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (dialogRef.componentInstance.data.stu === 'ok') {
        this.addressList.splice(index, 1);
      }
    });
  }
  // del(i){
    // this.orderListService

    // this.$fetch({
    //   method: 'DELETE', // 大写
    //   url: `${baseUrl}/address/shipping/detail/${this.deleteId}/`,
    //   header: {
    //     needAuth: true
    //   }
    // }).then(resData => {
    //   this.$notice.toast({
    //     message: 'Delete address success!'
    //   });
    //   const address = that.addressList[that.deleteIndex];
    //   if (address.isDefault) {
    //     that.$storage.get('user').then((data) => {
    //       const user = data
    //       user.defaultAddress = false
    //       that.$storage.set('user', user)
    //     })
    //   }
    //   that.addressList.splice(that.deleteIndex, 1)
    // }, error => {
    //   // this.$notice.toast({
    //   //     message: error
    //   // })
    // })
  // }
  openSnackBar(res) {
    this.snackBar.openFromComponent(ToastComponent, {
      data: {
        string: res
      },
      duration: 2500,
    });
  }
}
