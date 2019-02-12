import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { PromoteService } from '../promote.service';
import {SelectProductDialogComponent} from '../select-product-dialog/select-product-dialog.component';

@Component({
  selector: 'app-promote-promote-edit',
  templateUrl: './promote-edit.component.html',
  styleUrls: ['../_promote.scss']
})

export class PromoteEditComponent implements OnInit {

  currency: string = 'USD';

  campaign: any = {};

  categoryList: any;

  promotionProducts: any;

  promotionId: any;

  constructor(
    private promoteService: PromoteService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {
    this.promotionId = this.activatedRoute.snapshot.params['id'];
    this.getPromotionDetail();
  }

  ngOnInit(): void {
    this.promoteService.getCategoryList().then((data) => {
      this.categoryList = data;
      this.categoryList.unshift({
        id: false,
        data: {
          name: 'All'
        }
      });
    });
  }

  getPromotionDetail() {
    let id = this.promotionId;
    this.promoteService.getPromotionDetail({
      id
    }).then((data) => {
      this.campaign = data;
      this.promotionProducts = [...data.product];
    });
  }

  changePromotionProduct(event) {
    switch (event.event) {
      case 'delete':
        this.campaign.product.splice(event.index, 1);
        break;
      case 'save':
        // this.campaign = event.promote;
        break;
    }
  }

  save() {
    if(this.campaign.title == '') {
      return false;
    }
    this.promoteService.promotionEdit(this.campaign).then((data) => {
      this.campaign = data;
    });
  }


  selectProduct() {
    let dialogRef = this.dialog.open(SelectProductDialogComponent, {
      data: {
        categoryList: this.categoryList,
        promotionId: this.campaign.id,
        isEdit: false
      }
    });

    let self = this;

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isEdit == true) {
        self.getPromotionDetail();
      }
    });
  }

}
