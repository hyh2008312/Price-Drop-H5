import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { LotteryService } from '../lottery.service';

import { SelectProductDialogComponent } from  '../select-product-dialog/select-product-dialog.component';

@Component({
  selector: 'app-lottery-promote-create',
  templateUrl: './promote-create.component.html',
  styleUrls: ['../_lottery.scss']
})

export class PromoteCreateComponent implements OnInit {

  currency: string = 'USD';

  promotionForm: FormGroup;

  campaignType = ['Flash Sale'];

  isEdit: boolean = false;

  cardList: any;

  campaign: any = {};

  oldCategoryList: any;
  newCategoryList: any;

  firstPrize: any;

  secondPrize: any = 'Rs.150';

  thirdPrize: any = 'Rs.100';

  constructor(
    private promoteService: LotteryService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.promotionForm = this.fb.group({
      quantity: [1, Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      disc_sec: [30, Validators.required],
      disc_thd: [40, Validators.required]
    });
  }

  ngOnInit(): void {
    this.promoteService.getCategory().then((data) => {
      this.oldCategoryList = data;
      this.oldCategoryList.unshift({
        id: 'all',
        data: {
          name: 'All'
        }
      });
    });

    this.promoteService.getNewCategory().then((data) => {
      this.newCategoryList = data;
      this.newCategoryList.unshift({
        id: 'all',
        data: {
          name: 'All'
        }
      });
    });

    this.getCardList();
  }

  getCardList() {
    this.promoteService.getCardList().then((res) => {
      this.cardList = res;
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
        self.firstPrize = dialogRef.componentInstance.data.firstPrize;
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

    this.promoteService.changePromotionPrize({
      id: this.campaign.id,
      secondPrize: this.secondPrize,
      thirdPrize: this.thirdPrize
    }).then((data) => {
      this.router.navigate(['../../'],{relativeTo: this.activatedRoute});
    });
  }

}
