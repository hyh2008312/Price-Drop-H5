import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SizeChartService } from '../sizeChart.service';

@Component({
  selector: 'app-sizeChart-select-product-dialog',
  templateUrl: './select-product-dialog.component.html',
  styleUrls: ['../_sizeChart.scss']
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

  searchCategory: any = 'product';
  searchList: any = [{
    name: 'product',
    value: 'product'
  }, {
    name: 'supplier',
    value: 'shop'
  }];

  constructor(
    public dialogRef: MatDialogRef<SelectProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sizeChartService: SizeChartService,
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
    this.getPromoteProduct();
  }

  getPromoteProduct() {
    let param: any = {};
    if(this.searchKey != '') {
      param = {
        cat: this.cat,
        q: this.searchKey,
        qt: this.searchCategory,
        page: this.page,
        page_size: this.pageSize
      };
    } else {
      param = {
        cat: this.cat,
        page: this.page,
        page_size: this.pageSize
      }
    }

    this.sizeChartService.getProductList(param).then((data) => {
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
