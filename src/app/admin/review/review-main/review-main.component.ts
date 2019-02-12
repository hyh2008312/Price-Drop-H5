import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { Router, NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { ReviewService } from '../review.service';
import { UserService } from  '../../../shared/services/user/user.service';

import { saveAs } from 'file-saver';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-review-main',
  templateUrl: './review-main.component.html',
  styleUrls: ['../_review.scss']
})

export class ReviewComponent implements OnInit {

  reviewPendingApproval: any;
  reviewPendingApprovalIndex: any = 1;
  reviewPendingScore: any = false;
  reviewPublished: any;
  reviewPublishedIndex: any = 1;
  reviewPublishedScore: any = false;
  reviewUnpublished: any;
  reviewUnpublishedIndex: any = 1;
  reviewUnpublishedScore: any = false;

  selectedIndex = 0;

  // MatPaginator Inputs
  length:number = 0;
  pageSize = 50;
  pageSizeOptions = [50];
  scoreList: any = [{
    text: 'All',
    value: false
  }, {
    text: '1 star',
    value: '1'
  }, {
    text: '2 star',
    value: '2'
  }, {
    text: '3 star',
    value: '3'
  }, {
    text: '4 star',
    value: '4'
  }, {
    text: '5 star',
    value: '5'
  }];

  searchKey: any = '';
  isSearch: boolean = false;

  searchForm: FormGroup;

  searchCategory = 'user_name';
  searchList = [{
    text: "Username",
    value: 'user_name'
  }, {
    text: 'Order Number',
    value: 'order_number'
  }, {
    text: 'Product Name',
    value: 'variant_title'
  }, {
    text: 'SKU',
    value: 'sku'
  }];

  constructor(
    private reviewService: ReviewService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchKey: ['']
    });
  }

  ngOnInit():void {
    let self = this;
    self.changeProducts({
      index: self.selectedIndex
    });

  }

  clearSearchKey() {
    this.searchKey = '';
    this.changeProducts({
      index: this.selectedIndex
    });
  }

  ngOnDestroy() {

  }

  // MatPaginator Output
  changePage(event) {
    this.pageSize = event.pageSize;
    switch (this.selectedIndex) {
      case 0:
        this.reviewPendingApprovalIndex = event.pageIndex + 1;
        break;
      case 1:
        this.reviewPublishedIndex = event.pageIndex + 1;
        break;
      case 2:
        this.reviewUnpublishedIndex = event.pageIndex + 1;
        break;
    }
    this.changeProducts({index: this.selectedIndex});
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  changeProducts(event) {
    let page = 0;
    let comment_status = 'pending';
    let product_score = this.reviewPendingScore;
    let search = this.searchKey && this.searchKey != ''? this.searchKey: null;
    if(search) {
      search = encodeURIComponent(search)
    }
    let search_type = this.searchKey && this.searchKey != ''? this.searchCategory: null;
    switch (event.index) {
      case 0:
        page = this.reviewPendingApprovalIndex;
        product_score = product_score? product_score: null;
        this.reviewService.getReviewList({
          comment_status,
          product_score,
          page,
          search,
          search_type,
          page_size: this.pageSize
        }).then((data) => {
          this.length = data.count;
          this.reviewPendingApproval = [...data.results];
        });
        break;
      case 1:
        page = this.reviewPublishedIndex;
        comment_status = 'published';
        product_score = this.reviewPublishedScore;
        product_score = product_score? product_score: null;
        this.reviewService.getReviewList({
          comment_status,
          product_score,
          page,
          search,
          search_type,
          page_size: this.pageSize
        }).then((data) => {
          this.length = data.count;
          this.reviewPublished = [...data.results];
        });
        break;
      case 2:
        page = this.reviewUnpublishedIndex;
        comment_status = 'unpublished';
        product_score = this.reviewUnpublishedScore;
        product_score = product_score? product_score: null;
        this.reviewService.getReviewList({
          comment_status,
          product_score,
          page,
          search,
          search_type,
          page_size: this.pageSize
        }).then((data) => {
          this.length = data.count;
          this.reviewUnpublished = [...data.results];
        });
        break;
      default:
        break;
    }

  }

  productChange($event) {
    switch ($event.status) {
      case 0:
        if($event.event == 'published') {
          this.reviewPendingApproval.splice($event.index,1);
        }
        if($event.event == 'unpublished') {
          this.reviewPendingApproval.splice($event.index,1);
        }
      break;
      case 1:
        if($event.event == 'unpublished') {
          this.reviewPublished.splice($event.index,1);
        }
      break;
      case 2:
        if($event.event == 'published') {
          this.reviewUnpublished.splice($event.index,1);
        }
        break;
    }
  }

  sortChange($event) {
    switch (this.selectedIndex) {
      case 0:
        this.reviewPendingApprovalIndex = 1;
        this.reviewPendingScore = $event;
        break;
      case 1:
        this.reviewPublishedIndex = 1;
        this.reviewPublishedScore = $event;
        break;
      case 1:
        this.reviewUnpublishedIndex = 1;
        this.reviewUnpublishedScore = $event;
        break;
    }
    this.changeProducts({
      index: this.selectedIndex
    });

  }

}
