import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { Router,NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { SizeChartService } from '../sizeChart.service';
import { UserService } from  '../../../shared/services/user/user.service';

import { saveAs } from 'file-saver';
import {MatDialog} from '@angular/material';

import { SelectProductDialogComponent } from  '../select-product-dialog/select-product-dialog.component';
import { SelectMultiProductDialogComponent } from  '../select-multi-product-dialog/select-multi-product-dialog.component';

@Component({
  selector: 'app-sizeChart-main',
  templateUrl: './sizeChart-main.component.html',
  styleUrls: ['../_sizeChart.scss']
})

export class SizeChartMainComponent implements OnInit {

  categoryList: any = [];
  subCategoryList: any = [];
  thirdCategoryList: any = [];

  sizeChartId: any;
  sizeChartProduct: any;
  sizeChartProductIndex: any = 1;
  sizeChart: any;
  sizeChartIndex: any = 1;

  selectedIndex = 0;

  sizChartList:any = [];

  catList: any;

  productTitle: any;

  categoryId: any;


  // MatPaginator Inputs
  length:number = 0;
  pageSize = 50;
  pageSizeOptions = [50];

  searchKey: any = '';
  isSearch: boolean = false;

  constructor(
    private sizeChartService: SizeChartService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {

    this.getCategory();
    this.getSizeChartList();
    this.getCategoryList();
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
  changePage(event, type) {
    this.pageSize = event.pageSize;
    switch (type) {
      case 0:
        this.sizeChartProductIndex = event.pageIndex + 1;
        break;
      case 1:
        this.sizeChartIndex = event.pageIndex + 1;
        break;
    }
    this.changeProducts({index: type});
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  sizeChartChange($event) {
    this.sizeChartId = $event;
    this.sizeChartProductIndex = 1;
    this.changeProducts({
      index: this.selectedIndex
    });
  }

  changeProducts(event) {
    let page = 0;
    switch (event.index) {
      case 0:
        page = this.sizeChartProductIndex;
        let chart_id = this.sizeChartId? this.sizeChartId: null;
        let product_title = this.searchKey? this.searchKey: null;
        let category_id = this.categoryId? this.categoryId: null;
        this.sizeChartService.getSizeChartProductList({
          page,
          page_size: this.pageSize,
          chart_id,
          product_title,
          category_id
        }).then((data) => {
          this.length = data.count;
          this.sizeChartProduct = [...data.results];
        });
        break;
      case 1:
        page = this.sizeChartIndex;
        this.sizeChartService.getSizeChartList({
          page,
          page_size: this.pageSize
        }).then((data) => {
          this.length = data.count;
          this.sizeChart = [...data.results];
        });
        break;
      default:
        break;
    }

  }

  productChange($event) {
    switch ($event.status) {
      case 0:
        if($event.event == 'delete') {
          this.sizeChartProduct.splice($event.index,1);
        }
      break;
      case 1:
        if($event.event == 'delete') {
          this.sizeChart.splice($event.index,1);
        }
      break;
    }
  }

  getSizeChartList() {
    this.sizeChartService.getSizeChartAllList().then((data) => {
      this.sizChartList = [...data];
      this.sizChartList.unshift({
        name: 'All',
        id: false
      })
    });
  }

  addProducts() {
    let dialogRef = this.dialog.open(SelectProductDialogComponent, {
      data: {
        categoryList: this.catList,
        promotionId: this.sizeChartId,
        isEdit: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isEdit == true) {
        this.sizeChartProductIndex = 1;
        this.changeProducts({
          index: this.selectedIndex
        });
      }
    });
  }

  addProductsById() {
    let dialogRef = this.dialog.open(SelectMultiProductDialogComponent, {
      data: {
        promotionId: this.sizeChartId,
        isEdit: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isEdit == true) {
        this.sizeChartProductIndex = 1;
        this.changeProducts({
          index: this.selectedIndex
        });
      }
    });
  }

  getCategoryList() {
    this.sizeChartService.getCategoryList().then((data) => {
      this.catList = data;
      this.catList.unshift({
        id: 'all',
        name: 'All'
      });
    });
  }

  getCategory() {
    this.sizeChartService.getSupplierCategoryList().then((data) => {
      this.categoryList = [...data];
      this.categoryList.unshift({
        id: false,
        data: {
          name: 'All'
        }
      })
    });
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
    this.categoryId = $event;
    this.sizeChartProductIndex = 1;
    this.changeProducts({index: this.selectedIndex});
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
    this.categoryId = $event;
    this.sizeChartProductIndex = 1;
    this.changeProducts({index: this.selectedIndex});
  }

  thirdCategoryChange($event) {
    this.categoryId = $event;
    this.sizeChartProductIndex = 1;
    this.changeProducts({index: this.selectedIndex});
  }
}
