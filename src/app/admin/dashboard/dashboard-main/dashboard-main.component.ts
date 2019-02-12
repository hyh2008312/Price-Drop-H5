import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import {DashboardService} from "../dashboard.service";
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import {CategoryListDialogComponent} from "../category-list-dialog/category-list-dialog.component";

import { utils, write, WorkBook } from 'xlsx';

import { saveAs } from 'file-saver';

import { graphic } from 'echarts';
import {MatDialog} from '@angular/material';
import {UserService} from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-customer-service-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['../_dashboard.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'en'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})

export class DashboardMainComponent implements OnInit {

  // MatPaginator Inputs
  length: number = 32;
  pageSize = 12;
  pageSizeOptions = [6, 12];

  csAll: any;
  ceAll: any;
  psAll: any = false;
  peAll: any = false;

  csCate: any;
  ceCate: any;
  psCate: any = false;
  peCate: any = false;

  csPro: any;
  cePro: any;
  psPro: any = false;
  pePro: any = false;

  loadingOpts = {
    text: 'Loading',
    color: '#00bdfc',
    textColor: '#ff0000',
    maskColor: 'rgba(255, 255, 255, 0.6)',
    zlevel: 0
  };

  options: any = {
    tooltip : {
      trigger: 'axis'
    },
    xAxis: {
      axisLabel: {
        textStyle: {
          color: '#919aa7'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#48b',
          width: 1,
          type: 'solid'
        }
      }
    },
    yAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#48b',
          width: 1,
          type: 'solid'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#919aa7'
        }
      }
    }
  };

  options1: any;

  cate: any = false;
  cateList: any = [];
  subCateList: any = [];
  thirdCateList: any = [];

  category: any = false;
  categoryList: any = [];
  subCategoryList: any = [];
  thirdCategoryList: any = [];
  lastCategoryName: any;

  statistics: any = {
    "totalSales": 0,
    'totalOrders': 0,
    'averageOrderValue': 0,
    'totalSoldUnits': 0,
    'refundOrder': 0,
    'refundAmounts': 0,
    'canceledSingular': 0,
    'canceledAmount': 0
  };
  currency:string = 'INR';

  isCateLoading: any = false;
  isDateLoading: any = false;

  isSuperuser: any = false;

  inList: any;

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService
  ) {

    this.userService.currentUser.subscribe((data) => {
      if(data) {
        if(data.isStaff && data.isSuperuser) {
          this.isSuperuser = true
        }
      }
    });
  }

  ngOnInit(): void {
    this.getCharts();
    this.getCharts1();
    this.getDataList();
    this.getCategory();
  }

  getDataList() {
    let create_start_time: any = this.csAll? this.csAll: null;
    let create_end_time: any = this.ceAll? this.ceAll: null;
    let category: any = this.cate? this.cate: null;
    this.dashboardService.getDataList({
      create_start_time,
      create_end_time,
      category
    }).then((data) => {
      this.statistics = data;
    });
  }

  exportCateDataList() {
    let create_start_time: any = this.csAll? this.csAll: null;
    let create_end_time: any = this.ceAll? this.ceAll: null;
    this.dashboardService.getCateDataList({
      create_start_time,
      create_end_time
    }).then((res) => {
      const ws_name = `${(create_start_time?create_start_time.split(' ')[0]: 'yesterday') + ' '
      + (create_end_time?create_end_time.split(' ')[0]:'')}`;
      const wb: WorkBook = { SheetNames: [], Sheets: {} };

      let table = [
        "Category",
        "Category UV",
        "Total Sales",
        "Gross Sales",
        "Total Orders",
        "Gross Orders",
        "Total Sold Units",
        "Gross Sold Units",
        "product Qty-",
        "new product Qty-",
        "CR (order/UV)",
        "Avg. Order Sales"
      ];

      let excel: any = [];

      excel.push(table);

      for(let i = 0; i < res.length; i++) {
        const item = res[i];
        let cate = [];
        cate.push(item.name);
        cate.push('');
        cate.push(item.totalSales);
        cate.push(item.grossSales);
        cate.push(item.totalOrders);
        cate.push(item.grossOrders);
        cate.push(item.totalSoldUnits);
        cate.push(item.grossSoldUnits);
        cate.push(item.product);
        cate.push(item.newProduct);
        cate.push('');
        cate.push(item.averageOrderValue);
        excel.push(cate);
      }

      const ws: any = utils.json_to_sheet(excel, {skipHeader: true});
      wb.SheetNames.push(ws_name);
      wb.Sheets[ws_name] = ws;

      const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

      saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }),
        'Sales By Category.xlsx');

    });
  }

  addEvent(type: any, event:MatDatepickerInputEvent<any>) {
    if(event.value) {
      this[type] = event.value._i.year + '-'+ (event.value._i.month+1) +'-'+event.value._i.date + ' 00:00:00';
    } else {
      this[type] = null;
    }
  }

  filterDate() {
    this.getDataList();
  }

  filterDateCate() {
    this.getCharts1();
  }

  resetDateCate() {
    this.psCate = null;
    this.peCate = null;
    this.csCate = null;
    this.ceCate = null;
  }

  resetDate() {
    this.psAll = null;
    this.peAll = null;
    this.csAll = null;
    this.ceAll = null;
    this.getDataList();
  }
  showEight: boolean = false;

  changeEight(flag: boolean) {
    this.showEight = flag;
  }

  getCharts() {

    this.isCateLoading = true;
    this.dashboardService.getCategoryMainProductList().then((res) => {
      const dataAxis = [];
      const data = [];
      const dataShow = [];

      for (let i = 0; i < res.length; i++) {
        const item = res[i];
        dataAxis.push(item.name);
        data.push(item.count);
        dataShow.push({
          name: item.name,
          value: item.count,
          xAxis: i,
          yAxis: item.count
        });
      }

      this.options = {
        tooltip : {
          trigger: 'item'
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            interval: 0,
            textStyle: {
              color: 'rgba(0,0,0,0.87)'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#48b',
              width: 1,
              type: 'solid'
            }
          }
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: '#48b',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(0,0,0,0.87)'
            }
          }
        },
        series: [{
          name: 'Number of listings by Category',
          type: 'bar',
          barWidth: '32',
          symbol: 'droplet',
          showSymbol: true,
          hoverAnimation: false,
          data: data,
          itemStyle: {
            normal: {
              color: new graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' }
                ]
              ),
              barBorderRadius: [16, 16, 0, 0]
            },
            emphasis: {
              color: new graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ]
              ),
              barBorderRadius: [16, 16, 0, 0]
            }
          },
          markPoint: {
            large: true,
            data: dataShow,
            itemStyle: {
              normal: {
                color: '#663eb1'
              }
            }
          }
        }]
      };
      this.isCateLoading = false;
    });

  }

  getCharts1() {

    this.isDateLoading = true;
    let category_id = this.category? this.category: null;
    let create_start_time = this.csPro? this.csPro: null;
    let create_end_time = this.cePro? this.cePro: null;
    this.dashboardService.getCategoryDateProductList({
      category_id,
      create_start_time,
      create_end_time
    }).then((res) => {
      this.inList = res;
      const dataAxis = [];
      const data = [];
      const dataShow = [];

      let index = 0;
      for (let i = 0; i < res.length; i++) {
        const item = res[i];
        const date = item.date.split('T')[0].split('-');
        if(item.count > 0) {
          dataAxis.push(date[1] +'-'+ date[2]);
          data.push(item.count);
          dataShow.push({
            name: date[0] +'-'+ date[1] +'-'+ date[2],
            value: item.count,
            xAxis: index,
            yAxis: item.count
          });
          index++;
        }
      }

      this.options1 = {
        tooltip : {
          trigger: 'axis'
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            textStyle: {
              color: 'rgba(0,0,0,0.87)'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#48b',
              width: 1,
              type: 'solid'
            }
          }
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: '#48b',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(0,0,0,0.87)'
            }
          }
        },
        series: [{
          name: 'Number of Listings',
          type: 'line',
          barWidth: '10',
          showSymbol: true,
          hoverAnimation: false,
          data: data,
          itemStyle: {
            normal: {
              color: '#663eb1'
            }
          },
          markPoint: {
            large: true,
            data: dataShow
          }
        }]
      };
      this.isDateLoading = false;
    });

  }

  categoryChange($event: any) {
    if(this.categoryList.length > 0) {
      let index = this.categoryList.findIndex((data) => {
        if(data.id == $event.id) {
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

    this.category = $event.id;
    this.lastCategoryName = $event.data.name;
    this.getCharts1();
  }

  subCategoryChange($event: any) {
    if(this.subCategoryList.length > 0) {
      let index = this.subCategoryList.findIndex((data) => {
        if(data.id == $event.id) {
          return true;
        }
      });
      if(this.subCategoryList[index] && this.subCategoryList[index].children) {
        this.thirdCategoryList = [...this.subCategoryList[index].children];
      } else {
        this.thirdCategoryList = [];
      }
    }

    this.category = $event.id;
    this.lastCategoryName = $event.data.name;
    this.getCharts1();
  }

  thirdCategoryChange($event: any) {
    this.category = $event.id;
    this.lastCategoryName = $event.data.name;
    this.getCharts1();
  }

  cateChange($event) {
    if(this.cateList.length > 0) {
      let index = this.cateList.findIndex((data) => {
        if(data.id == $event) {
          return true;
        }
      });
      if(this.cateList[index] && this.cateList[index].children) {
        this.subCateList = [...this.cateList[index].children];
      } else {
        this.subCateList = [];
      }
      this.thirdCateList = [];
    }

    this.cate = $event;
    this.getDataList();
  }

  subCateChange($event) {
    if(this.subCateList.length > 0) {
      let index = this.subCateList.findIndex((data) => {
        if(data.id == $event) {
          return true;
        }
      });
      if(this.subCateList[index] && this.subCateList[index].children) {
        this.thirdCateList = [...this.subCateList[index].children];
      } else {
        this.thirdCateList = [];
      }
    }

    this.cate = $event;
    this.getDataList();
  }

  thirdCateChange($event) {
    this.cate = $event;
    this.getDataList();
  }

  getCategory() {
    this.dashboardService.getCategoryList().then((data) => {
      this.categoryList = [...data];
      this.categoryList.unshift({
        id: false,
        data: {
          name: 'All'
        }
      });
      this.cateList = [...data];
      this.cateList.unshift({
        id: false,
        data: {
          name: 'All'
        }
      });

      this.lastCategoryName = 'All';
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(CategoryListDialogComponent, {
      data: {}
    });

    let self = this;

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  export(): void {
    const ws_name = 'Products-' + this.lastCategoryName.substring(0, 18);
    const wb: WorkBook = { SheetNames: [], Sheets: {} };

    let tab1 = [
      "Published Date",
      "Number of Listings"
    ];

    let table = tab1;

    let excel: any = [];

    excel.push(table);

    for(let i = 0; i < this.inList.length; i++) {
      const item = this.inList[i];
      let cate = [];
      cate.push(item.date.split('T')[0]);
      cate.push(item.count);
      excel.push(cate);
    }

    const ws: any = utils.json_to_sheet(excel, {skipHeader: true});
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }), `${this.lastCategoryName + '-' + new Date().getTime()}.xlsx`);

  }

  s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }

  ExportAllCategory() {
    this.dashboardService.getCategoryMainProductDetailList().then((res) => {
      const ws_name = 'All Categories';
      const wb: WorkBook = { SheetNames: [], Sheets: {} };

      let tab1 = [
        "Category Name",
        "Number of Listings"
      ];

      let table = tab1;

      let excel: any = [];

      excel.push(table);

      for(let i = 0; i < res.length; i++) {
        const item = res[i];
        let cate = [];
        cate.push(item.name);
        cate.push(item.count);
        excel.push(cate);
      }

      const ws: any = utils.json_to_sheet(excel, {skipHeader: true});
      wb.SheetNames.push(ws_name);
      wb.Sheets[ws_name] = ws;

      const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

      saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }), `All-${new Date().getTime()}.xlsx`);

    });
  }

}
