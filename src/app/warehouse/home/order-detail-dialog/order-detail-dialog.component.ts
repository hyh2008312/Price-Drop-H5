import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { HomeService } from '../home.service';

@Component({
  selector: 'app-warehouse-home-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['../_home.scss']
})

export class OrderDetailDialogComponent implements OnInit {

  productItems: any;

  baseInfo: any;
  sellerContact: any = {};

  constructor(
    public dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private homeService: HomeService
  ) {
    this.getOrderDetail(this.data.id);
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  getOrderDetail(id) {
    if(!id) return;
    this.homeService.getOrderDetail({
      id
    }).then((data) => {
      if(data.success) {
        this.productItems = data.result.productItems;
        this.baseInfo = data.result.baseInfo;
        this.sellerContact = data.result.baseInfo.sellerContact;
      }
    });
  }

}
