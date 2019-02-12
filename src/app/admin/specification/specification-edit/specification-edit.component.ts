import { Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';

import { SpecificationService } from '../specification.service';
import { ActivatedRoute} from '@angular/router';

import { AddCategoryAttributeDialogComponent} from '../add-category-attribute-dialog/add-category-attribute-dialog.component';
import {MatDialog} from '@angular/material';

import { utils, write, WorkBook } from 'xlsx';

import { saveAs } from 'file-saver';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-specification-edit',
  templateUrl: './specification-edit.component.html',
  styleUrls: ['../_specification.scss']
})

export class SpecificationEditComponent implements OnInit {

  promoteAll: any;
  categoryName: any = '';
  lastCategoryName: any = '';
  attributeList: any = [];
  valueList: any = [];
  categoryId: any;
  searchKey: any = '';
  searchForm: FormGroup;
  ready: any = false;

  page: any = 1;
  length: any = 0;
  pageList: any = [1,2,3,4,5,6,7,8,9,10];
  statusList: any = [{
    value: 'pending',
    text: 'Pending'
  }, {
    value: 'published',
    text: 'Published'
  }, {
    value: 'unpublished',
    text: 'Unpublished'
  }];
  status: any = 'pending';
  error: any = false;

  constructor(
    private adminService: SpecificationService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.getAttributeList();
    this.getValueList();
    this.getProductDetail();
    this.categoryId = this.activatedRoute.snapshot.params['id'];

    this.searchForm = this.fb.group({
      searchKey: ['']
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {}

  getProductDetail() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.adminService.getCategoryAttributeDetail({
      id
    }).then((data) => {
      this.categoryName = data.grandParentName + (data.parentName ? ' > ' + data.parentName: '')
         + (data.childName ? ' > ' + data.childName: '');
      if(data.childName) {
        this.lastCategoryName = data.childName;
      } else {
        this.lastCategoryName = data.parentName;
      }
      this.promoteAll = [...data.specificationList];
    });
  }

  getAttributeList() {
    this.adminService.getAttributeList().then((data) => {
      this.attributeList = [...data];
    });
  }

  getValueList() {
    this.adminService.getAttributeValueList().then((data) => {
      this.valueList = [...data];
      this.ready = 'Download is ready!'
    });
  }

  addAttribute() {
    let dialogRef = this.dialog.open(AddCategoryAttributeDialogComponent, {
      data: {
        id: this.activatedRoute.snapshot.params['id'],
        isAddAttribute: false,
        attributeList: this.attributeList
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isAddAttribute) {
        this.getProductDetail();
      }
    });
  }

  productChange($event) {
    switch ($event.status) {
      case 1:
        if($event.event == 'delete') {
          this.promoteAll.splice($event.index,1);
        }
        if($event.event == 'edit') {
          this.promoteAll[$event.index] = $event.item;
        }
        break;
    }
  }

  export(): void {
    if(this.searchKey == '') {
      return;
    }
    const ws_name = 'Category-' + this.lastCategoryName.substring(0, 15) + '-' + this.categoryId;
    const ws_name1 = 'Template-' + this.lastCategoryName.substring(0, 22);
    const wb: WorkBook = { SheetNames: [], Sheets: {} };

    let tab1 = [
      "序号",
      "产品ID",
      "产品SPU",
      "主图链接",
      "变体ID",
      "SKU",
      "变体1名称",
      "变体值",
      "变体2名称",
      "变体值",
      "库存数量",
      "产品基础分类",
      "产品CMS分类",
      "产品中文名称",
      "产品英文名称",
      "采购价 (Rs.)",
      "Cost Price (Rs.)",
      "MRP (Rs.)",
      "Sale Price (Rs.)"
    ];
    let tab2 = [
      "Net Weight (kg)",
      "Shipping Weight (kg)",
      "长",
      "宽",
      "高",
      "Contain Battery (Y / N)",
      "Shipping Id",
      "Shipping Carrier",
      "shipping Time Min",
      "shipping Time Max",
      "Shipping Cost (Rs.)",
      "Country of Origin",
      "供应商ID",
      "供应商名称",
      "采购链接",
      "交货期",
      "最小起订量",
      "供应商所在地",
      "随机数*"
    ];

    let tabColumn = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    let tab3 = [];

    for(let item of this.promoteAll) {
      if(item.specificationCount > 1) {

        for(let i = 0; i < item.specificationCount; i++) {
          tab3.push(item.name);
        }
      } else {
        tab3.push(item.name);
      }
    }

    let table = tab1.concat(tab3).concat(tab2);

    let excel: any = [];

    excel.push(table);

    let excel1: any = [];

    excel1.push(['Attributes', 'Options']);

    this.adminService.getCategoryAttributeDetailList({
      categoryId: this.activatedRoute.snapshot.params['id'],
      shopName: this.searchKey,
      page: this.page,
      page_size: 500,
      productStatus: this.status
    }).then((data) => {
      this.length = data.count;
      this.error = false;

      let indexNumber = 0;
      for(let i = 0; i < data.results.length; i++) {
        const item = data.results[i];
        const num = (2.3 + Math.random() * (2.8 - 2.3)).toFixed(2);
        for(let j = 0; j < item.variants.length; j++) {
          let columnNumber = 0;
          let costNumber = 0;
          const _itm = item.variants[j];
          let product: any = [];
          indexNumber++;
          product.push(indexNumber);
          product.push(item.id);
          product.push(item.spu);
          product.push(_itm.mainImage);
          product.push(_itm.id);
          product.push(_itm.sku);
          columnNumber+=5;

          const attr = _itm.attributeValues;

          switch (attr.length) {
            case 0:
              product.push('');
              product.push('');
              product.push('');
              product.push('');
              columnNumber+=4;
              break;
            case 1:
              if(_itm.attributeValues[0].name == 'Size') {
                product.push(_itm.attributeValues[0].name);
                product.push(_itm.attributeValues[0].value);
                product.push('');
                product.push('');
                columnNumber+=4;
              } else {
                product.push('');
                product.push('');
                product.push(_itm.attributeValues[0].name);
                product.push(_itm.attributeValues[0].value);
                columnNumber+=4;
              }
              break;
            case 2:
              product.push(_itm.attributeValues[0].name);
              product.push(_itm.attributeValues[0].value);
              product.push(_itm.attributeValues[1].name);
              product.push(_itm.attributeValues[1].value);
              columnNumber+=4;
              break;
            default:
              product.push('');
              product.push('');
              product.push('');
              product.push('');
              columnNumber+=4;
              break;
          }

          product.push(_itm.availableStock);
          product.push(item.categories[0].fullName);
          product.push('');
          product.push(item.chineseTitle);
          product.push(item.title);

          columnNumber+=5;

          product.push(_itm.sourcingPrice? _itm.sourcingPrice: 0);
          columnNumber+=1;
          let sourcingPrice = (Math.floor(columnNumber / tabColumn.length) - 1 < 0 ? '' : tabColumn[Math.floor(columnNumber / tabColumn.length) - 1]) + '' + tabColumn[columnNumber % tabColumn.length];
          product.push(_itm.costPrice);
          columnNumber+=1;
          let costPrice = (Math.floor(columnNumber / tabColumn.length) - 1 < 0 ? '' : tabColumn[Math.floor(columnNumber / tabColumn.length) - 1]) + '' + tabColumn[columnNumber % tabColumn.length];
          costNumber = columnNumber;
          product.push({
            t: 'n',
              v: _itm.saleUnitPrice,
              f: costPrice + (indexNumber + 1) + '*' + num
          });
          columnNumber+=1;
          product.push(_itm.unitPrice);
          columnNumber+=1;

          for(let itm of this.promoteAll) {
            let isInTemplate = false;
            for (let g = 0; g < item.productSpecification.length; g++) {
              const specification = item.productSpecification[g];
              if (itm.name == specification.name) {
                isInTemplate = true;
                if(itm.specificationCount > 1) {
                  const arr = specification.content.split(',');
                  if(itm.specificationCount >= arr.length) {
                    for(let f = 0; f < arr.length; f++) {
                      product.push(arr[f]? arr[f]: '');
                    }
                    for(let k = 0; k < itm.specificationCount - arr.length; k++) {
                      product.push('');
                    }
                  } else {
                    for(let k = 0; k < itm.specificationCount; k++) {
                      product.push(arr[k]? arr[k]: '');
                    }
                  }

                  columnNumber+=itm.specificationCount;
                } else {
                  product.push(specification.content);
                  columnNumber+=1;
                }
              }
            }
            if(!isInTemplate) {
              if(itm.specificationCount > 1) {
                for(let m = 0; m < itm.specificationCount; m++) {
                  product.push('');
                }
                columnNumber+=itm.specificationCount;
              } else {
                product.push('');
                columnNumber+=1;
              }
            }
          }

          product.push(item.weight);
          columnNumber+=1;
          let netWeight = (Math.floor(columnNumber / tabColumn.length) - 1 < 0 ? '' : tabColumn[Math.floor(columnNumber / tabColumn.length) - 1]) + '' + tabColumn[columnNumber % tabColumn.length];
          product.push(item.shippingWeight);
          columnNumber+=1;
          let shippingWeight = (Math.floor(columnNumber / tabColumn.length) - 1 < 0 ? '' : tabColumn[Math.floor(columnNumber / tabColumn.length) - 1])  + '' + tabColumn[columnNumber % tabColumn.length];
          product.push(item.length);
          columnNumber+=1;
          let length = (Math.floor(columnNumber / tabColumn.length) - 1 < 0 ? '' : tabColumn[Math.floor(columnNumber / tabColumn.length) - 1])  + '' + tabColumn[columnNumber % tabColumn.length];
          product.push(item.width);
          columnNumber+=1;
          let width = (Math.floor(columnNumber / tabColumn.length) - 1 < 0 ? '' : tabColumn[Math.floor(columnNumber / tabColumn.length) - 1])  + '' + tabColumn[columnNumber % tabColumn.length];
          product.push(item.height);
          columnNumber+=1;
          let height = (Math.floor(columnNumber / tabColumn.length) - 1 < 0 ? '' : tabColumn[Math.floor(columnNumber / tabColumn.length) - 1])  + '' + tabColumn[columnNumber % tabColumn.length];
          product.push(item.isBattery?'Y':'N');
          columnNumber+=1;
          let isBattery = (Math.floor(columnNumber / tabColumn.length) - 1 < 0 ? '' : tabColumn[Math.floor(columnNumber / tabColumn.length) - 1])  + '' + tabColumn[columnNumber % tabColumn.length];

          product.push(item.shipping?item.shipping.id:'');
          product.push(item.shipping?item.shipping.shippingName:'');
          product.push(item.shipping?item.shipping.shippingTimeMin:'');
          product.push(item.shipping?item.shipping.shippingTimeMax:'');
          columnNumber+=4;
          product.push({
            t: 'n',
            v: item.shipping.priceItem,
            f: 'IF(' + isBattery + (indexNumber + 1) + '="N",IF(' + shippingWeight + (indexNumber + 1) + '>' + length + (indexNumber + 1) + '*' + width + (indexNumber + 1) + '*' + height + (indexNumber + 1) + '/6000,' + shippingWeight + (indexNumber + 1) + ',' + length + (indexNumber + 1) + '*' + width + (indexNumber + 1) + '*' + height + (indexNumber + 1) + '/6000)*450+60,IF(' + shippingWeight + (indexNumber + 1) + '>' + length + (indexNumber + 1) + '*' + width + (indexNumber + 1) + '*' + height + (indexNumber + 1) + '/6000,' + shippingWeight + (indexNumber + 1) + ',' + length + (indexNumber + 1) + '*' + width + (indexNumber + 1) + '*' + height + (indexNumber + 1) + '/6000)*500+60)'
          });
          columnNumber+=1;
          let shippingCost = (Math.floor(columnNumber / tabColumn.length) - 1 < 0 ? '' : tabColumn[Math.floor(columnNumber / tabColumn.length) - 1])  + '' + tabColumn[columnNumber % tabColumn.length];
          product[costNumber] = {
            t: 'n',
            v: _itm.costPrice,
            f: '' + sourcingPrice + (indexNumber + 1) + '*1.2+' + shippingCost + (indexNumber + 1)
          };

          product.push(item.originCountry.code);
          product.push(item.supplierId);
          product.push(item.shopName);
          product.push(item.purchaseLink);
          product.push(item.processingTime);
          product.push(item.minimumQuantity);
          product.push(item.supplierLocation?item.supplierLocation: '');

          excel.push(product);
        }

      }

      for(let itm of this.promoteAll) {
        let template = [];
        template.push(itm.name);

        const attrValues: any = itm.specificationValues ? itm.specificationValues.split(',') : [];

        for(let em of attrValues) {
          template.push(em);
        }
        excel1.push(template);

        let template1 = [];
        template1.push(itm.chineseName);

        for(let bm of attrValues) {
          for(let cm of this.valueList) {
            if(cm.name == bm) {
              template1.push(cm.chineseName);
            }
          }
        }

        excel1.push(template1);

      }
      const ws: any = utils.json_to_sheet(excel, {skipHeader: true});
      const ws1: any = utils.json_to_sheet(excel1, {skipHeader: true});
      wb.SheetNames.push(ws_name);
      wb.SheetNames.push(ws_name1);
      wb.Sheets[ws_name] = ws;
      wb.Sheets[ws_name1] = ws1;

      const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

      saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }), `${this.lastCategoryName + '-' + new Date().getTime()}.xlsx`);

    }).catch((err) => {
      this.error = err;
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

  clearSearchKey() {
    this.searchKey = '';
  }
}
