import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { Router,NavigationStart, ActivatedRoute} from '@angular/router';

import {ReportService} from "../report.service";

@Component({
  selector: 'app-admin-report-main',
  templateUrl: './report-main.component.html',
  styleUrls: ['../_report.scss']
})

export class ReportMainComponent implements OnInit {

  date: any = 7;
  dateList = [{
    name: 'Last 7 Days',
    value: 7
  }, {
    name: 'Last 30 Days',
    value: 30
  }, {
    name: 'Last 90 Days',
    value: 90
  }, {
    name: 'Year to Date',
    value: 360
  }];

  salesSort: any = 7;
  salesSortList = [{
    name: 'Units Sold',
    value: 7
  }, {
    name: 'Total Sales',
    value: 30
  }, {
    name: 'Total Views',
    value: 90
  }, {
    name: 'Conversion',
    value: 360
  }, {
    name: 'Total Commission',
    value: 360
  }];

  sales: any = false;
  salesIndex = 1;

  selectedIndex: number = 0;

  // MatPaginator Inputs
  length:number = 0;
  pageSize = 12;
  pageSizeOptions = [6, 12];

  constructor(
      private shopService: ReportService
  ) {

  }

  ngOnInit():void {
    this.changeProducts();
  }

  ngOnDestroy() {
  }

  // MatPaginator Output
  changePage(event, type) {
    this.pageSize = event.pageSize;
    this.salesIndex = event.pageIndex + 1;
    this.changeProducts();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  changeProducts() {
    let relationStatus = 'published';
    let page = this.salesIndex;

    let self = this;
    self.shopService.getProductList({
      status: relationStatus,
      page: page,
      page_size: this.pageSize
    }).then((data) => {
      self.length = data.count;
      self.sales = data.results;

    });
  }

  changeSort($event, type) {
    switch (type) {
      case 1:
        this.salesSort = $event;
        break;
      default:
        this.date = $event;
        break;
    }
    this.changeProducts();
  }


}
