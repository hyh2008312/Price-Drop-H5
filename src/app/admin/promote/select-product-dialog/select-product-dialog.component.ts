import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PromoteService } from '../promote.service';

@Component({
  selector: 'app-promote-select-product-dialog',
  templateUrl: './select-product-dialog.component.html',
  styleUrls: ['../_promote.scss']
})

export class SelectProductDialogComponent implements OnInit {

  currency: string = 'USD';

  searchKey: any = '';
  isSearch: boolean = false;
  searchForm: FormGroup;

  categoryList: any = [];
  subCategoryList: any = [];
  thirdCategoryList: any = [];

  cat: any;

  promotionProduct: any;

  length = 12;
  page = 1;
  pageSize = 6;

  constructor(
    public dialogRef: MatDialogRef<SelectProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private promoteService: PromoteService,
    private fb: FormBuilder
  ) {

    this.searchForm = this.fb.group({
      searchKey: ['']
    });

    this.categoryList = this.data.categoryList;

    this.searchForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.getPromoteProduct();
  }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

  onValueChanged(data) {
    this.isSearch = false;
  }

  clearSearchKey() {
    this.searchKey = '';
  }

  getPromoteProduct() {
    let param: any = {};

    this.cat = this.cat? this.cat: null;

    if(this.searchKey != '') {
      param = {
        cat: this.cat,
        q: encodeURIComponent(this.searchKey),
        qt: 'product',
        pid: this.data.promotionId,
        page: this.page,
        page_size: this.pageSize
      };
    } else {
      param = {
        cat: this.cat,
        pid: this.data.promotionId,
        page: this.page,
        page_size: this.pageSize
      }
    }


    this.promoteService.getPromotionProductList(param).then((data) => {
      this.length = data.count;
      this.promotionProduct = data.results;
    });
  }

  changePage($event) {
    this.page = $event.page;
    this.getPromoteProduct();
  }

  promoteChanges(event) {
    if(event.event == 'changed') {
      this.data.isEdit = true;
      this.promotionProduct.splice(event.index,1);
    }
  }

  categoryChange($event) {
    if(this.categoryList.length > 0) {
      let index = this.categoryList.findIndex((data) => {
        if(data.id == $event) {
          return true;
        }
      });
      if(this.categoryList[index] && this.categoryList[index].children) {
        this.subCategoryList = [...this.categoryList[index].children];
      } else {
        this.subCategoryList = [];
      }
      this.thirdCategoryList = [];
    }
    this.cat = $event;
    this.getPromoteProduct();
  }

  subCategoryChange($event) {
    if(this.subCategoryList.length > 0) {
      let index = this.subCategoryList.findIndex((data) => {
        if(data.id == $event) {
          return true;
        }
      });
      if(this.subCategoryList[index] && this.subCategoryList[index].children) {
        this.thirdCategoryList = [...this.subCategoryList[index].children];
      } else {
        this.thirdCategoryList = [];
      }
    }
    this.cat = $event;
    this.getPromoteProduct();
  }

  thirdCategoryChange($event) {
    this.cat = $event;
    this.getPromoteProduct();
  }
}
