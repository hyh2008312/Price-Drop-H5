import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';

import { HomeService } from '../home.service';
import { UserService } from  '../../../shared/services/user/user.service';
import { OrderTrackingDialogComponent } from '../order-tracking-dialog/order-tracking-dialog.component';
import { OrderDetailDialogComponent } from '../order-detail-dialog/order-detail-dialog.component';
import { HomeEditDialogComponent } from '../home-edit-dialog/home-edit-dialog.component';
import { HomeCompleteDialogComponent } from '../home-complete-dialog/home-complete-dialog.component';
import { HomeWrongDialogComponent } from '../home-wrong-dialog/home-wrong-dialog.component';
import { HomeImageDialogComponent } from '../home-image-dialog/home-image-dialog.component';
import { AddAttentionDialogComponent } from '../add-attention-dialog/add-attention-dialog.component';
import { AddTrackingDialogComponent } from '../add-tracking-dialog/add-tracking-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ToolTipsComponent } from '../tool-tips/tool-tips.component';

@Component({
  selector: 'app-warehouse-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['../_home.scss']
})

export class HomeItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any;
  @Input() index: number = 0;
  @Output() productChange = new EventEmitter<any>();

  currency: string = 'INR';
  isSuperuser: boolean = false;

  constructor(
    private adminService: HomeService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.userService.currentUser.subscribe((data) => {
      if(data) {
        if(data.isStaff && data.isSuperuser) {
          this.isSuperuser = true
        }
      }
    });
  }

  ngOnInit(): void {}

  trackingPackage() {
    let dialogRef = this.dialog.open(OrderTrackingDialogComponent, {
      data: {
        item: this.product
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  openAttentionDialog() {
    let dialogRef = this.dialog.open(AddAttentionDialogComponent, {
      data: {
        item: this.product,
        isEdit: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isEdit == true) {
        this.product = dialogRef.componentInstance.data.item;
      }
    });
  }

  orderDetails() {
    let dialogRef = this.dialog.open(OrderDetailDialogComponent, {
      data: {
        id: this.product.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  edit() {
    let dialogRef = this.dialog.open(HomeEditDialogComponent, {
      data: {
        item: this.product,
        isEdit: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isEdit == true) {
        this.product = dialogRef.componentInstance.data.item;
      }
    });
  }

  delete() {
    this.adminService.purchaseDelete({
      id: this.product.id
    }).then((data) => {
      this.productChange.emit({
        index: this.index,
        product : this.product,
        status: this.status,
        event: 'delete'
      });
    });
  }

  complete() {
    let dialogRef = this.dialog.open(HomeCompleteDialogComponent, {
      data: {
        item: this.product,
        isEdit: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isEdit == true) {
        if(this.product.purchaseStatus != dialogRef.componentInstance.data.item.purchaseStatus) {
          this.productChange.emit({
            index: this.index,
            product : this.product,
            status: this.status,
            event: 'complete'
          });
        }
        this.product = dialogRef.componentInstance.data.item;
      }
    });
  }

  wrong() {
    let dialogRef = this.dialog.open(HomeWrongDialogComponent, {
      data: {
        item: this.product,
        isEdit: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isEdit == true) {
        if(this.product.purchaseStatus != dialogRef.componentInstance.data.item.purchaseStatus) {
          this.productChange.emit({
            index: this.index,
            product : this.product,
            status: this.status,
            event: 'wrong'
          });
        }
        this.product = dialogRef.componentInstance.data.item;
      }
    });
  }

  openLargeImage(data) {
    let dialogRef = this.dialog.open(HomeImageDialogComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  changeTrackingNumber() {
    let dialogRef = this.dialog.open(AddTrackingDialogComponent, {
      data: {
        item: this.product,
        isEdit: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isEdit == true) {
        this.product = dialogRef.componentInstance.data.item;
      }
    });
  }

  copy($event) {
    this.openCopyBar();
  }

  openCopyBar() {
    this.snackBar.openFromComponent(ToolTipsComponent, {
      data: 'Successfully Copied!',
      duration: 1500,
      verticalPosition: 'top'
    });
  }

  transformLogistic(item) {
    if(item) {
      return item.split(',');
    } else {
      return [];
    }

  }

}
