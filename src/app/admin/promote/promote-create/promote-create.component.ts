import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { PromoteService } from '../promote.service';

import { SelectProductDialogComponent } from  '../select-product-dialog/select-product-dialog.component';

@Component({
  selector: 'app-promote-promote-create',
  templateUrl: './promote-create.component.html',
  styleUrls: ['../_promote.scss']
})

export class PromoteCreateComponent implements OnInit {

  currency: string = 'USD';

  promotionForm: FormGroup;

  campaignType = ['Flash Sale'];

  isEdit: boolean = false;

  campaign: any = {};

  oldCategoryList: any;
  newCategoryList: any;

  constructor(
    private promoteService: PromoteService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.promotionForm = this.fb.group({
      title: ['', Validators.required],
      promotionType: ['Flash Sale', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.promoteService.getCategoryList().then((data) => {
      this.oldCategoryList = data;
      this.oldCategoryList.unshift({
        id: 'all',
        data: {
          name: 'All'
        }
      });
    });

    this.promoteService.getNewCategoryList().then((data) => {
      this.newCategoryList = data;
      this.newCategoryList.unshift({
        id: 'all',
        data: {
          name: 'All'
        }
      });
    });
  }

  continue() {
    if(this.promotionForm.invalid) {
      return;
    }

    const params:any = this.promotionForm.value;

    this.promoteService.promotionCreate(params).then((data) => {
      if(data) {
        this.isEdit = true;
        this.campaign = data;
      }
    });
  }

  selectProduct() {
    let dialogRef = this.dialog.open(SelectProductDialogComponent, {
      data: {
        oldCategoryList: this.oldCategoryList,
        newCategoryList: this.newCategoryList,
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

  getPromotionDetail() {
    let params: any = {
      id: this.campaign.id
    };
    this.promoteService.getPromotionDetail(params).then((data) => {
      this.campaign = data;
    });
  }

  changePromotionProduct(event) {
    switch(event.event) {
      case 'delete':
        this.campaign.product.splice(event.index, 1);
        break;
      case 'discount':
        this.campaign.product[event.index] = event.promote;
    }
  }

  save() {
    if(!this.campaign.product || this.campaign.product.length <= 0) {
      return this.router.navigate(['../'],{relativeTo: this.activatedRoute});
    }

    let discounts: any = [];
    for(let item of this.campaign.product) {
      discounts.push({
        pid: item.id,
        discount: item.discount
      });
    }

    this.promoteService.changePromotionDiscounts({
      id: this.campaign.id,
      discounts
    }).then((data) => {
      this.router.navigate(['../'],{relativeTo: this.activatedRoute});
    });
  }

}
