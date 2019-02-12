import { Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { InventoryService } from '../inventory.service';
import {utils, WorkBook, write} from 'xlsx';

import { saveAs } from 'file-saver';
import {UserService} from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-warehouse-inventory-main',
  templateUrl: './inventory-main.component.html',
  styleUrls: ['../_inventory.scss']
})

export class InventoryMainComponent implements OnInit {

  selectedIndex: number = 0;

  searchKey: any = '';
  isSearch: boolean = false;
  searchForm: FormGroup;

  searchCategory: any = 'sku';

  searchList:any = [{
    text: 'SKU编号',
    value: 'sku'
  }];

  quantityList: any = [{
    text: '所有',
    value: false
  }, {
    text: '库存大于0',
    value: '1'
  }, {
    text: '库存为0',
    value: '0'
  }];

  // MatPaginator Inputs
  length:number = 0;
  pageSize = 50;
  pageSizeOptions = [25, 50];

  isSuperuser: boolean = false;

  inventoryAll: any = false;
  quantityAll: any = '1';
  inventoryAllIndex: any = 1;
  inventoryWare: any = false;
  quantityWare: any = '1';
  inventoryWareIndex: any = 1;

  warehouseId: any = false;
  warehouseList: any;

  showNav: any = false;

  isLoading: boolean = false;
  color: any = 'accent';
  mode: any = 'indeterminate';
  value: any = 20;

  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService
  ) {

    this.userService.currentUser.subscribe((data) => {
      if(data) {
        if(data.isStaff && data.isSuperuser) {
          this.isSuperuser = true
        }
      }
    });

    this.getWarehouseList();

    this.searchForm = this.fb.group({
      searchKey: ['']
    });

    this.searchForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.changeInventoryLists({
      index: this.selectedIndex
    });
  }

  onValueChanged(data) {
    this.isSearch = false;
  }

  clearSearchKey() {
    this.searchKey = '';
    this.inventoryAllIndex = 1;
    this.changeInventoryLists({
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

  changePage(event) {
    this.pageSize = event.pageSize;
    this.inventoryAllIndex = event.pageIndex + 1;
    this.changeInventoryLists({index: this.selectedIndex});
  }

  changeInventoryLists($event) {
    let search: any = null;
    let search_type: any = null;
    let page = this.inventoryAllIndex;
    let quantity: any = null;

    if(this.searchKey && this.searchKey != '') {
      search = this.searchKey;
      search = encodeURIComponent(search);
      search_type = this.searchCategory;
      if($event.type == 'search') {
        this.inventoryAllIndex = 1;
      }
    }

    switch (this.selectedIndex) {
      case 1:
        quantity = this.quantityAll;
        quantity = quantity? quantity: null;
        this.inventoryService.getInventoryList({
          page,
          page_size: this.pageSize,
          search,
          search_type,
          quantity
        }).then((data) => {
          this.length = data.count;
          this.inventoryAll = [...data.results];
        });
        break;
      case 0:
        page = this.inventoryWareIndex;
        quantity = this.quantityWare;
        quantity = quantity? quantity: null;
        let warehouse_id: any = this.warehouseId? this.warehouseId: null;
        this.inventoryService.getWarehouseInventoryList({
          page,
          page_size: this.pageSize,
          search,
          search_type,
          quantity,
          warehouse_id
        }).then((data) => {
          this.length = data.count;
          this.inventoryWare = [...data.results];
        });
        break;
    }

  }

  quantityChange($event) {
    switch (this.selectedIndex) {
      case 1:
        this.quantityAll = $event;
        this.inventoryAllIndex = 1;
        break;
      case 0:
        this.quantityWare = $event;
        this.inventoryWareIndex = 1;
        break;
    }

    this.changeInventoryLists({
      index: this.selectedIndex
    });

  }

  warehouseChange($event) {
    switch (this.selectedIndex) {
      case 0:
        this.warehouseId = $event;
        this.inventoryWareIndex = 1;
        break;
    }
    this.changeInventoryLists({
      index: this.selectedIndex
    });
  }

  getWarehouseList() {
    this.inventoryService.getWarehouseList().then((data) => {
      this.warehouseList = [...data];
      this.warehouseList.unshift({
        id: false,
        warehouseName: '所有'
      });
    });
  }

  export(): void {
    const ws_name = '库存清单';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    let packing: any = [];
    let excel: any = [];
    switch (this.selectedIndex) {
      case 1:
        excel = [...this.inventoryAll];
        break;
      case 0:
        excel = [...this.inventoryWare];
        break;
    }

    for(let item of excel) {
      let orderItem: any = {};
      orderItem['标题'] = item.title;
      orderItem['规格'] = item.attribute;
      orderItem['SKU编号'] = item.sku;
      orderItem['总库存'] = item.quantity;
      orderItem['锁定库存'] = item.freezeQuantity;
      orderItem['剩余库存'] = item.quantity - item.freezeQuantity;
      packing.push(orderItem);
    }

    const ws: any = utils.json_to_sheet(packing);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }), '库存表' +
      new Date().getUTCFullYear() + '-' + (new Date().getMonth() + 1 < 10? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) +
      '-' +(new Date().getDate() < 10? '0' + new Date().getDate() : new Date().getDate())
      + '.xlsx');

  }

  exportAll(): void {
    const ws_name = '总库存清单';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    let packing: any = [];
    let excel: any = [];

    this.isLoading = true;
    this.inventoryService.getAllInventoryList().then((data) => {
      this.isLoading = false;

      excel = [...data];

      for(let item of excel) {
        let orderItem: any = {};
        orderItem['标题'] = item.title;
        orderItem['规格'] = item.attribute;
        orderItem['SKU编号'] = item.sku;
        orderItem['总库存'] = item.quantity;
        orderItem['锁定库存'] = item.freezeQuantity;
        orderItem['剩余库存'] = item.quantity - item.freezeQuantity;
        packing.push(orderItem);
      }

      const ws: any = utils.json_to_sheet(packing);
      wb.SheetNames.push(ws_name);
      wb.Sheets[ws_name] = ws;
      const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

      saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }), '总库存清单' +
        new Date().getUTCFullYear() + '-' + (new Date().getMonth() + 1 < 10? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) +
        '-' +(new Date().getDate() < 10? '0' + new Date().getDate() : new Date().getDate())
        + '.xlsx');

    });

  }

  s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }

  scrollChange($event) {
    this.showNav = $event;
  }

}
