import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { TrackingService } from '../tracking.service';
import { UserService } from  '../../../shared/services/user/user.service';
import { TrackingCreateDialogComponent } from '../tracking-create-dialog/tracking-create-dialog.component';
import { MatDialog } from '@angular/material';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {utils, WorkBook, write} from 'xlsx';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-warehouse-tracking-main',
  templateUrl: './tracking-main.component.html',
  styleUrls: ['../_tracking.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'zh-CN'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})

export class TrackingMainComponent implements OnInit {

  selectedIndex: number = 0;

  searchKey: any = '';
  isSearch: boolean = false;
  searchForm: FormGroup;

  searchCategory: any = 'international_tracking_number';

  searchList:any = [{
    text: '运单号',
    value: 'international_tracking_number'
  }, {
    text: '检货单号',
    value: 'pick_number'
  }, {
    text: '订单号',
    value: 'order_number'
  }, {
    text: 'SKU',
    value: 'sku'
  }];

  // MatPaginator Inputs
  length:number = 0;
  pageSize = 50;
  pageSizeOptions = [25, 50];

  isSuperuser: boolean = false;

  btList: any = [{
    value: false,
    text: '所有'
  }, {
    value: '1',
    text: '带电'
  }, {
    value: '0',
    text: '不带电'
  }];
  codList: any = [{
    value: false,
    text: '所有'
  }, {
    value: '1',
    text: '是COD'
  }, {
    value: '0',
    text: '不是COD'
  }];
  sortList: any = [{
    value: 'true',
    text: '正序'
  }, {
    value: 'false',
    text: '逆序'
  }];

  btAll: any = false;
  codAll: any = false;
  purchaseAll: any = false;
  purchaseAllIndex: any = 1;
  sortAll: any = 'true';
  wbAll: any = false;
  csProcessing: any;
  ceProcessing: any;
  asProcessing: any;
  aeProcessing: any;
  btProcessing: any = false;
  codProcessing: any = false;
  purchaseProccessing: any = false;
  purchaseProccessingIndex: any = 1;
  wbProcessing: any = false;
  sortProcessing: any = 'true';
  csShipped: any;
  ceShipped: any;
  asShipped: any;
  aeShipped: any;
  btShipped: any = false;
  codShipped: any = false;
  wbShipped: any = false;
  purchaseShipped: any = false;
  purchaseShippedIndex: any = 1;
  purchaseDeleted: any = false;
  purchaseDeletedIndex: any = 1;
  sortShipped: any = 'true';
  wbDeleted: any = false;
  csNotFound: any;
  ceNotFound: any;
  asNotFound: any;
  aeNotFound: any;
  btNotFound: any = false;
  codNotFound: any = false;
  purchaseNotFound: any = false;
  purchaseNotFoundIndex: any = 1;
  sortNotFound: any = 'true';
  wbNotFound: any = false;

  warehouseList: any;

  showNav: any = false;

  constructor(
    private adminService: TrackingService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {

    this.getWarehouseList();

    this.userService.currentUser.subscribe((data) => {
      if(data) {
        if(data.isStaff && data.isSuperuser) {
          this.isSuperuser = true
        }
      }
    });

    this.searchForm = this.fb.group({
      searchKey: ['']
    });

    this.searchForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.changePurchaseLists({
      index: 0
    });
  }

  onValueChanged(data) {
    this.isSearch = false;
  }

  clearSearchKey() {
    this.searchKey = '';
    switch (this.selectedIndex) {
      case 0:
        this.purchaseAllIndex = 1;
        break;
      case 1:
        this.purchaseProccessingIndex = 1;
        break;
      case 2:
        this.purchaseShippedIndex = 1;
        break;
      case 3:
        this.purchaseDeletedIndex = 1;
        break;
      case 4:
        this.purchaseNotFoundIndex = 1;
        break;
    }
    this.changePurchaseLists({
      index: this.selectedIndex
    });
  }

  ngOnInit():void {
  }

  ngOnDestroy() {

  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  // MatPaginator Output
  changePage(event, type) {
    this.pageSize = event.pageSize;
    switch (type) {
      case 0:
        this.purchaseAllIndex = event.pageIndex + 1;
        break;
      case 1:
        this.purchaseProccessingIndex = event.pageIndex + 1;
        break;
      case 2:
        this.purchaseShippedIndex = event.pageIndex + 1;
        break;
      case 3:
        this.purchaseDeletedIndex = event.pageIndex + 1;
        break;
      case 4:
        this.purchaseNotFoundIndex = event.pageIndex + 1;
        break;
    }
    this.changePurchaseLists({index: type});
  }

  changePurchaseLists($event) {

    let status: any = null;
    let page = this.purchaseAllIndex;
    let page_size = this.pageSize;
    let received_time: any = null;
    let create_start_time: any = null;
    let create_end_time: any = null;
    let packing_start_time: any = null;
    let packing_end_time: any = null;
    let is_battery: any = null;
    let is_cod: any = null;
    let is_positive_sequence: any = null;
    let warehouse_id: any = null;

    switch ($event.index) {
      case 0:
        is_battery = this.btAll;
        is_cod = this.codAll;
        is_positive_sequence = this.sortAll;
        warehouse_id = this.wbAll;
        break;
      case 1:
        is_battery = this.btProcessing;
        is_cod = this.codProcessing;
        status = 'Pending Packaging';
        page = this.purchaseProccessingIndex;
        create_start_time = this.csProcessing;
        create_end_time = this.ceProcessing;
        is_positive_sequence = this.sortProcessing;
        warehouse_id = this.wbProcessing;
        break;
      case 2:
        is_battery = this.btShipped;
        is_cod = this.codShipped;
        status = 'Packaging Completed';
        page = this.purchaseShippedIndex;
        packing_start_time = this.csShipped;
        packing_end_time = this.ceShipped;
        is_positive_sequence = this.sortShipped;
        warehouse_id = this.wbShipped;
        break;
      case 3:
        status = 'Package Deleted';
        page = this.purchaseDeletedIndex;
        received_time = true;
        warehouse_id = this.wbDeleted;
        break;
      case 4:
        is_battery = this.btNotFound;
        is_cod = this.codNotFound;
        status = 'Not Found';
        page = this.purchaseNotFoundIndex;
        create_start_time = this.csNotFound;
        create_end_time = this.ceNotFound;
        is_positive_sequence = this.sortNotFound;
        warehouse_id = this.wbNotFound;
        break;
    }

    let search: any = null;
    let search_type: any = null;
    if(this.searchKey && this.searchKey != '') {
      search = this.searchKey;
      search = encodeURIComponent(search);
      search_type = this.searchCategory;
    }
    is_battery = is_battery? is_battery: null;
    is_cod = is_cod? is_cod: null;
    warehouse_id = warehouse_id? warehouse_id: null;

    this.adminService.getPickList({
      status,
      page,
      page_size,
      search,
      search_type,
      received_time,
      create_start_time,
      create_end_time,
      packing_start_time,
      packing_end_time,
      is_battery,
      is_cod,
      is_positive_sequence,
      warehouse_id
    }).then((data) => {
      this.length = data.count;
      switch ($event.index) {
        case 0:
          this.purchaseAll = [...data.results];
          break;
        case 1:
          this.purchaseProccessing = [...data.results];
          break;
        case 2:
          this.purchaseShipped = [...data.results];
          break;
        case 3:
          this.purchaseDeleted = [...data.results];
          break;
        case 4:
          this.purchaseNotFound = [...data.results];
          break;
      }
    });
  }

  createPurchase() {
    let dialogRef = this.dialog.open(TrackingCreateDialogComponent, {
      data: {
        isCreated: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isCreated == true) {
        this.selectedIndex = 0;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
      }
    });
  }

  productChange(event) {
    switch(event.status) {
      case 1:
        switch(event.event) {
          case 'delete':
            this.purchaseProccessing.splice(event.index,1);
            break;
          case 'change':
            this.purchaseProccessing.splice(event.index,1);
            break;
        }
        break;
      case 2:
        switch(event.event) {
          case 'change':
            this.purchaseShipped.splice(event.index,1);
            break;
        }
        break;
      case 3:
        switch(event.event) {
          case 'delete':
            this.purchaseDeleted.splice(event.index,1);
            break;
          case 'complete':
            this.purchaseDeleted.splice(event.index,1);
            break;
        }
        break;
      case 4:
        switch(event.event) {
          case 'delete':
            this.purchaseNotFound.splice(event.index,1);
            break;
          case 'change':
            this.purchaseNotFound.splice(event.index,1);
            break;
        }
        break;
    }
  }

  addEvent(type: any, event:MatDatepickerInputEvent<any>) {
    if(event.value) {
      this[type] = event.value._i.year + '-'+ (event.value._i.month+1) +'-'+event.value._i.date + ' 00:00:00';
    } else {
      this[type] = null;
    }
  }

  filterDate() {
    switch (this.selectedIndex) {
      case 1:
        this.purchaseProccessingIndex = 1;
        break;
      case 2:
        this.purchaseShippedIndex = 1;
        break;
    }
    this.changePurchaseLists({
      index: this.selectedIndex
    });
  }

  cancelDate(type) {
    switch (type) {
      case 1:
        this.csProcessing = null;
        this.ceProcessing = null;
        this.asProcessing = null;
        this.aeProcessing = null;
        this.purchaseProccessingIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
      case 2:
        this.csShipped = null;
        this.ceShipped = null;
        this.asShipped = null;
        this.aeShipped = null;
        this.purchaseShippedIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
      case 4:
        this.csNotFound = null;
        this.ceNotFound = null;
        this.asNotFound = null;
        this.aeNotFound = null;
        this.purchaseNotFoundIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
    }
  }

  btChange($event) {
    switch (this.selectedIndex) {
      case 0:
        this.btAll = $event;
        this.purchaseAllIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
      case 1:
        this.btProcessing = $event;
        this.purchaseProccessingIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
      case 2:
        this.btShipped = $event;
        this.purchaseShippedIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
      case 4:
        this.btNotFound = $event;
        this.purchaseNotFoundIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
    }
  }

  codChange($event) {
    switch (this.selectedIndex) {
      case 0:
        this.codAll = $event;
        this.purchaseAllIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
      case 1:
        this.codProcessing = $event;
        this.purchaseProccessingIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
      case 2:
        this.codShipped = $event;
        this.purchaseShippedIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
      case 4:
        this.codNotFound = $event;
        this.purchaseNotFoundIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
    }
  }

  sortChange($event) {
    switch (this.selectedIndex) {
      case 0:
        this.sortAll = $event;
        this.purchaseAllIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
      case 1:
        this.sortProcessing = $event;
        this.purchaseProccessingIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
      case 2:
        this.sortShipped = $event;
        this.purchaseShippedIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
      case 4:
        this.sortNotFound = $event;
        this.purchaseNotFoundIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
    }
  }

  warehouseChange($event) {
    switch (this.selectedIndex) {
      case 0:
        this.wbAll = $event;
        this.purchaseAllIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
      case 1:
        this.wbProcessing = $event;
        this.purchaseProccessingIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
      case 2:
        this.wbShipped = $event;
        this.purchaseShippedIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
      case 3:
        this.wbDeleted = $event;
        this.purchaseShippedIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
      case 4:
        this.wbNotFound = $event;
        this.purchaseNotFoundIndex = 1;
        this.changePurchaseLists({
          index: this.selectedIndex
        });
        break;
    }
  }

  export(): void {
    const ws_name = '拣货订单及物流';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    let packing: any = [];
    let excel: any = [];
    switch (this.selectedIndex) {
      case 1:
        excel = [...this.purchaseProccessing];
        break;
      case 2:
        excel = [...this.purchaseShipped];
        break;
      case 4:
        excel = [...this.purchaseShipped];
        break;
    }

    for(let item of excel) {
      for( let itm of item.pickVariants) {
        let orderItem: any = {};
        orderItem['订单号'] = itm.orderNumber;
        orderItem['运单号'] = item.internationalTrackingNumber;
        orderItem['物流公司'] = item.internationalCarrier;
        orderItem['创建日期'] = item.created.split('T')[0];
        orderItem['拣货日期'] = item.packagingTime ? item.packagingTime.split('T')[0]: '';
        packing.push(orderItem);
      }
    }

    const ws: any = utils.json_to_sheet(packing);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }), '拣货单号表' +
      new Date().getUTCFullYear() + '-' + (new Date().getMonth() + 1 < 10? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) +
      '-' +(new Date().getDate() < 10? '0' + new Date().getDate() : new Date().getDate())
      + '.xlsx');

  }

  exportNew(): void {
    const ws_name = '拣货订单及物流';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    let packing: any = [];
    let excel: any = [];
    switch (this.selectedIndex) {
      case 1:
        excel = [...this.purchaseProccessing];
        break;
      case 2:
        excel = [...this.purchaseShipped];
        break;
      case 4:
        excel = [...this.purchaseShipped];
        break;
    }

    for(let item of excel) {
      for(let i = 0; i < item.pickVariants.length; i++) {
        const itm = item.pickVariants[i];
        let orderItem: any = {};
        orderItem['运单号'] = item.internationalTrackingNumber;
        if(i == 0) {
          orderItem['物流公司'] = item.internationalCarrier;
          orderItem['创建日期'] = item.created.split('T')[0];
        } else {
          orderItem['物流公司'] = '';
          orderItem['创建日期'] = '';
        }
        orderItem['sku'] = itm.sku;
        orderItem['拣货数量'] = itm.quantity;
        packing.push(orderItem);
      }
    }

    const ws: any = utils.json_to_sheet(packing);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }), '拣货单号表' +
      new Date().getUTCFullYear() + '-' + (new Date().getMonth() + 1 < 10? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) +
      '-' +(new Date().getDate() < 10? '0' + new Date().getDate() : new Date().getDate())
      + '.xlsx');

  }

  s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }

  captureScreen() {
    let data = document.getElementById('table');
    let excel: any = [...this.purchaseProccessing];

    let html = '';
    html+='<tr style="height: 131px;">' +
      '<td style="width:40px;font-size: 18px;line-height: 24px;font-weight:bold;text-align: center;">序号</td>' +
      '<td style="width:60px;font-size: 18px;line-height: 24px;font-weight:bold;text-align: center;">运单号</td>' +
      '<td style="width:140px;font-size: 18px;line-height: 24px;font-weight:bold;text-align: center;">SKU</td>' +
      '<td style="width:40px;font-size: 18px;line-height: 24px;font-weight:bold;text-align: center;">拣货数量</td>' +
      '<td style="width:120px;font-size: 18px;line-height: 24px;font-weight:bold;text-align: center;">图片</td>' +
      '<td style="width:100px;font-size: 18px;line-height: 24px;font-weight:bold;text-align: center;">规格</td>' +
      '<td style="width:60px;font-size: 18px;line-height: 24px;font-weight:bold;text-align: center;">带电／不带电</td>' +
      '<td style="width:60px;font-size: 18px;line-height: 24px;font-weight:bold;text-align: center;">COD／非COD</td>' +
      '<td style="width:40px;font-size: 18px;line-height: 24px;font-weight:bold;text-align: center;">物流公司</td>' +
      '</tr>';


    let number = 1;
    let index = 1;

    for(let item of excel) {
      for(let i = 0; i < item.pickVariants.length; i++) {
        html+='<tr style="height: 131px;">';
        const itm = item.pickVariants[i];

        if(i == 0) {
          html += `<td style="width:40px;font-size: 16px;text-align: center;">${index}</td>`;
          index++;
        } else {
          html += `<td style="width:40px;font-size: 20px;text-align: center;"></td>`;
        }
        html += `<td style="width:60px;font-size: 20px;text-align: center;">${item.internationalTrackingNumber}</td>`;
        html += `<td style="width:140px;word-wrap:break-word;font-size: 20px;text-align: center;">${itm.sku}</td>`;
        html += `<td style="width:40px;font-size: 20px;text-align: center;">${itm.quantity}</td>`;
        html += `<td style="width:120px;font-size: 20px;text-align: center;"><img style="border: 1px solid rgba(0, 0, 0, .12);" src="${itm.mainImage}" width="120" height="120"></td>`;
        html += `<td style="width:100px;word-wrap:break-word;font-size: 20px;text-align: center;">${itm.attribute}</td>`;
        if(i == 0) {
          html += `<td style="width:60px;font-size: 20px;text-align: center;">${item.isBattery ? "BAT带电" : "不带电"}</td>`;
          html += `<td style="width:60px;font-size: 20px;text-align: center;">${item.isCod ? "COD" : "非COD"}</td>`;
          html += `<td style="width:60px;font-size: 16px;text-align: center;">${item.internationalCarrier}</td>`;
        } else {
          html += `<td style="width:60px;font-size: 20px;text-align: center;"></td>`;
          html += `<td style="width:60px;font-size: 20px;text-align: center;"></td>`;
          html += `<td style="width:40px;font-size: 16px;text-align: center;"></td>`;
        }

        html += '</tr>';

        if(number > 1 && number % 12 == 0) {
          html+='<tr style="height: 131px;">' +
            '<td style="width:40px;font-size: 18px;line-height: 24px;font-weight:bold;text-align: center;">序号</td>' +
            '<td style="width:40px;font-size: 18px;line-height: 24px;font-weight:bold;text-align: center;">运单号</td>' +
            '<td style="width:140px;font-size: 18px;line-height: 24px;font-weight:bold;text-align: center;">SKU</td>' +
            '<td style="width:40px;font-size: 18px;line-height: 24px;font-weight:bold;text-align: center;">拣货数量</td>' +
            '<td style="width:120px;font-size: 18px;line-height: 24px;font-weight:bold;text-align: center;">图片</td>' +
            '<td style="width:100px;font-size: 18px;line-height: 24px;font-weight:bold;text-align: center;">规格</td>' +
            '<td style="width:60px;font-size: 18px;line-height: 24px;font-weight:bold;text-align: center;">带电／不带电</td>' +
            '<td style="width:60px;font-size: 18px;line-height: 24px;font-weight:bold;text-align: center;">COD／非COD</td>' +
            '<td style="width:40px;font-size: 18px;line-height: 24px;font-weight:bold;text-align: center;">物流公司</td>' +
            '</tr>';
        }

        number++;
      }
    }

    data.insertAdjacentHTML('afterbegin', html);
    html2canvas(data, {
      useCORS: true
    }).then(canvas => {
      // Few necessary setting options
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      if(heightLeft < pageHeight) {
        pdf.addImage(contentDataURL, 'JPEG', 0, 0, imgWidth,imgHeight);
      } else {
        while(heightLeft > 0) {
          //arg3-->距离左边距;arg4-->距离上边距;arg5-->宽度;arg6-->高度
          pdf.addImage(contentDataURL, 'JPEG', 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight;
          position -= 295;
          //避免添加空白页
          if(heightLeft > 0) {
            //注②
            pdf.addPage();
          }
        }
      }

      pdf.save('拣货单号表' +
        new Date().getUTCFullYear() + '-' + (new Date().getMonth() + 1 < 10? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) +
        '-' +(new Date().getDate() < 10? '0' + new Date().getDate() : new Date().getDate())
        + '.pdf'); // Generated PDF
      data.innerHTML = '';
    }).catch((data) => {
      console.log(data)
    });
  }

  getWarehouseList() {
    this.adminService.getWarehouseList().then((data) => {
      this.warehouseList = [...data];
      this.warehouseList.unshift({
        id: false,
        warehouseName: '所有'
      });
    });
  }

  scrollChange($event) {
    this.showNav = $event;
  }

}
