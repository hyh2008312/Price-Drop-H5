import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TopicService } from '../topic.service';

@Component({
  selector: 'app-promote-select-product-dialog',
  templateUrl: './select-product-dialog.component.html',
  styleUrls: ['../_topic.scss']
})

export class SelectProductDialogComponent implements OnInit {

  currency: string = 'USD';

  searchKey: any = '';
  isSearch: boolean = false;
  searchForm: FormGroup;

  cat: any;
  min: any;
  max: any;

  promotionProduct: any;

  length = 12;
  page = 1;
  pageSize = 6;

  constructor(
    public dialogRef: MatDialogRef<SelectProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private promoteService: TopicService,
    private fb: FormBuilder
  ) {

    this.searchForm = this.fb.group({
      searchKey: ['']
    });

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
    let min_price: any = this.min && this.min != ''? this.min: null;
    let max_price: any = this.max && this.max != ''? this.max: null;
    if(this.searchKey != '') {
      param = {
        cat: this.cat,
        q: this.searchKey,
        qt: 'product',
        page: this.page,
        page_size: this.pageSize,
        min_price,
        max_price
      };
    } else {
      param = {
        cat: this.cat,
        page: this.page,
        page_size: this.pageSize,
        min_price,
        max_price
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

  categorySelect($event) {
    this.cat = $event;

    this.getPromoteProduct();
  }

  promoteChanges(event) {
    if(event.event == 'changed') {
      this.data.isEdit = true;
      this.promotionProduct.splice(event.index,1);
    }
  }
}
