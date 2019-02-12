import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { LotteryService } from '../lottery.service';
import {SelectProductDialogComponent} from '../select-product-dialog/select-product-dialog.component';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-lottery-promote-edit',
  templateUrl: './promote-edit.component.html',
  styleUrls: ['../_lottery.scss']
})

export class PromoteEditComponent implements OnInit {

  currency: string = 'USD';

  campaign: any = {
    quantity: 1
  };

  oldCategoryList: any;
  newCategoryList: any;

  promotionProducts: any;

  promotionId: any;

  cardList: any;

  firstPrize: any;

  secondPrize: any = 'Rs.150';

  thirdPrize: any = 'Rs.100';

  selectedIndex = 0;

  // MatPaginator Inputs
  length:number = 0;
  pageSize = 100;
  pageSizeOptions = [100];

  participants: any;
  participantsIndex: any = 1;
  candidates: any;
  candidatesIndex: any = 1;
  winners: any;
  winnersIndex: any = 1;
  shipment: any;
  shipmentIndex: any = 1;

  searchForm: FormGroup;

  searchKey: any = '';
  isSearchesult: boolean = false;

  prize: any = false;
  prizeList:any = [{
    value: false,
    name: 'All'
  }, {
    value: 'first',
    name: 'First'
  }, {
    value: 'second',
    name: 'Second'
  }, {
    value: 'third',
    name: 'Third'
  }];

  constructor(
    private promoteService: LotteryService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchKey: ['']
    });

    this.promotionId = this.activatedRoute.snapshot.params['id'];
    this.getPromotionDetail();
    this.getParticipantList();
    this.changeProducts({index: 0});
  }

  searchResult() {
    let self = this;
    self.isSearchesult = true;

    if(self.searchKey == '') return;


    let params: any = {
      id: this.promotionId,
      email: self.searchKey
    };

    this.promoteService.getSupplyPromoteResult(params).then((data) => {

      self.length = data.length;

      switch (self.selectedIndex) {
        case 0:
          this.participants = [...data];
          break;
        case 1:
          this.candidates = [...data];
          break;
      }

    });
  }

  clearSearchKey() {
    this.searchKey = '';
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

  // MatPaginator Output
  changePage(event, type) {
    this.pageSize = event.pageSize;
    switch (type) {
      case 0:
        this.participantsIndex = event.pageIndex + 1;
        break;
      case 1:
        this.candidatesIndex = event.pageIndex + 1;
        break;
      case 2:
        this.winnersIndex = event.pageIndex + 1;
        break;
      case 3:
        this.shipmentIndex = event.pageIndex + 1;
        break;
    }
    this.changeProducts({index: type});
  }

  changeProducts($event) {
    let page = 0;
    switch ($event.index) {
      case 0:
        page = this.participantsIndex;
        this.promoteService.getParticipantList({
          id: this.promotionId,
          page,
          page_size: this.pageSize
        }).then((data) => {
          this.length = data.count;
          this.participants = [...data.results];
        });
        break;
      case 1:
        page = this.candidatesIndex;
        this.promoteService.getParticipantList({
          id: this.promotionId,
          page,
          page_size: this.pageSize
        }).then((data) => {
          this.length = data.count;
          this.candidates = [...data.results];
        });
        break;
      case 2:
        page = this.winnersIndex;
        this.promoteService.getWinnerList({
          id: this.promotionId,
          page,
          page_size: this.pageSize,
          status: this.prize
        }).then((data) => {
          this.length = data.count;
          this.winners = [...data.results];
        });
        break;
      case 3:
        page = this.shipmentIndex;
        this.promoteService.getWinnerList({
          id: this.promotionId,
          page,
          page_size: this.pageSize,
          status: 'first'
        }).then((data) => {
          this.length = data.count;
          this.shipment = [...data.results];
        });
        break;
    }
  }

  productChange($event) {

  }

  prizeChange($event) {
    this.prize = $event;
    this.changeProducts({index: 2});
  }

  getCardList() {
    this.promoteService.getCardList().then((res) => {
      this.cardList = res;
    });
  }

  getPromotionDetail() {
    let id = this.promotionId;
    this.promoteService.getPromotionDetail({
      id
    }).then((data) => {
      this.campaign = data;
      if(data.product) {
        this.firstPrize = {
          image: data.image,
          product: data.product
        }
      }
      this.secondPrize = data.secondPrize;
      this.thirdPrize = data.thirdPrize;
    });
  }

  getParticipantList() {

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

  saveBasic() {
    this.promoteService.changePromotionDetail({
      id: this.campaign.id,
      quantity: this.campaign.quantity,
      discSec: this.campaign.discountSecond,
      discThd: this.campaign.discountThird,
    }).then((data) => {});
  }

  save() {
    this.promoteService.changePromotionPrize({
      id: this.campaign.id,
      secondPrize: this.secondPrize,
      thirdPrize: this.thirdPrize
    }).then((data) => {});
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

  confirmWinnerList() {
    this.promoteService.setPrizeWinner({
      id: this.promotionId
    }).then((data) => {
      this.campaign = data;
    });
  }

}
