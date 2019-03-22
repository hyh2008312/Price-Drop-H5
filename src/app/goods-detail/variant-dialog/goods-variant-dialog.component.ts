import {Component, Input, Inject, OnInit, Output, EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';




@Component({
  selector: 'app-goods-variant-dialog',
  templateUrl: './goods-variant-dialog.component.html',
  styleUrls: ['./_goods-variant-dialog.scss']
})

export class GoodsVariantDialogComponent implements OnInit {

  @Output() statusChange: any = new EventEmitter();
  goods: any;
  goodsVariants: any;
  goodsType: any;
  canBuy: any;
  variantsId: any;
  selimgsrc: any;
  selsize: any;
  selcolor: any;
  selunitPrice: any;
  selsaleUnitPrice: any;
  tmpArray: any;
  hasVariants: any;
  nextPage: any = {
    mainImage: ''
  };

  constructor(
    public dialogRef: MatDialogRef<GoodsVariantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getGoods(this.data.goods)
    this.goods = this.data.goods
    // this.goods.aliasSize = this.data.goods.aliasSize
    // this.goods.aliasColor = this.data.goods.aliasColor
    // this.goods.productSize = this.data.goods.productSize
    // console.log(this.data.goods)
  }
  getGoods(res) {
    console.log(res)
    this.goodsVariants = res.variants;
    if (res.images != null) {
      this.selimgsrc = res.images[0]
      this.nextPage.mainImage = this.selimgsrc
    } else {
      this.selimgsrc = ''
    }

    if (res.attributes != null && res.attributes.length > 0) {
      if (this.goodsVariants.length == 1) {
        this.hasVariants = false;
        this.nextPage.attributes = '';
        this.goodsType = [];
        this.canBuy = res.variants[0].isCanBuy;
        this.variantsId = res.variants[0].id;

        this.nextPage.id = res.variants[0].id;
        this.nextPage.salePrice = res.variants[0].saleUnitPrice;
        this.nextPage.currentPrice = res.variants[0].unitPrice;
      } else {
        this.goodsType = res.attributes;
        this.operateData(res.attributes);
      }
    } else {

      this.hasVariants = false;
      this.nextPage.attributes = '';
      this.goodsType = [];
      this.canBuy = res.variants[0].isCanBuy;
      this.variantsId = res.variants[0].id;
      this.nextPage.id = res.variants[0].id;
      this.nextPage.salePrice = res.variants[0].saleUnitPrice;
      this.nextPage.currentPrice = res.variants[0].unitPrice;
      // this.nextPage.mainImage =
    }

  }
  operateData(data){
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].value.length; j++) {
        data[i].value[j].isActive = false
        data[i].value[j].seldisable = false
      }
    }
    return data
  }
  clickColor (item, list) {
    if (item.seldisable) return
    item.isActive = !item.isActive
    for (let i = 0; i < list.length; i++) {
      if (list[i].value != item.value) {
        list[i].isActive = false
      }
    }
    const color = []; // 点选的这个 有其他的颜色或者规格
    const discolor = [];
    for (let j = 0; j < this.goodsVariants.length; j++) {
      for (let k = 0; k < this.goodsVariants[j].attributeValues.length; k++) {
        if (item.value == this.goodsVariants[j].attributeValues[k].value) {
          color.push({
            item: this.goodsVariants[j],
            index: k
          });
          break;
          // this.seldisable = true
        }
      }
    }
    if (item.isActive == true) {
      for (let n = 0; n < color.length; n++) {
        for (let m = 0; m < color[n].item.attributeValues.length; m++) {
          if (m == color[n].index) {
            continue
          }
          discolor.push(color[n].item.attributeValues[m].value)
        }
      }

      for (let p = 0; p < this.goodsType.length; p++) {
        if (item.id != this.goodsType[p].id) {
          for (let u = 0; u < this.goodsType[p].value.length; u++) {
            this.goodsType[p].value[u].seldisable = true
            for (let o = 0; o < discolor.length; o++) {
              if (this.goodsType[p].value[u].value == discolor[o]) {
                this.goodsType[p].value[u].seldisable = false
              }
            }
          }
        }
      }
    } else {
      for (let p = 0; p < this.goodsType.length; p++) {
        if (item.id != this.goodsType[p].id) {
          for (let u = 0; u < this.goodsType[p].value.length; u++) {
            this.goodsType[p].value[u].seldisable = false
          }
        }
      }
    }
    this.changeDom(item, color)
  }
  changeDom (item, color) {
    if (item.isActive == true) {
      if (item.id == 1) {
        this.selsize = item.value
      } else if (item.id == 2) {
        this.selcolor = item.value
      }
    } else if (item.isActive == false) {
      if (item.id == 1) {
        this.selsize = ''
      } else if (item.id == 2) {
        this.selcolor = ''
      }
    }
    if ((this.selsize == '') || (this.selcolor == '')) {
      this.canBuy = true
      this.variantsId = ''
    }
    let tmp = []
    for (let i = 0; i < this.goodsType.length; i++) {
      if (this.goodsType[i].name == 'Color') {
        tmp = this.goodsType[i].images
      }
    }
    for (let j = 0; j < tmp.length; j++) {
      if (tmp[j].value == this.selcolor) {
        this.selimgsrc = tmp[j].image
      }
    }
    this.nextPage.attributes = this.selcolor + ' ' + this.selsize;
    this.nextPage.mainImage = this.selimgsrc;

    this.tmpArray = [];
    for (let i = 0; i < this.goodsType.length; i++) {
      for (let j = 0; j < this.goodsType[i].value.length; j++) {
        if (this.goodsType[i].value[j].isActive == true) {
          this.tmpArray.push(this.goodsType[i].value[j])
          break;
        }
      }
    }
    for (let i = 0; i < this.goodsVariants.length; i++) {
      let isDoubleChecked = 0;
      for (let j = 0; j < this.goodsVariants[i].attributeValues.length; j++) {
        for (let m = 0; m < this.tmpArray.length; m++) {
          if (this.tmpArray[m].id == this.goodsVariants[i].attributeValues[j].attributeId &&
            this.tmpArray[m].value == this.goodsVariants[i].attributeValues[j].value) {
            isDoubleChecked += 1;
          }
        }
      }
      if (isDoubleChecked == this.goodsType.length) {
        this.variantsId = this.goodsVariants[i].id;
        this.canBuy = this.goodsVariants[i].isCanBuy;
        this.selsaleUnitPrice = this.goodsVariants[i].saleUnitPrice
        this.selunitPrice = this.goodsVariants[i].unitPrice

        this.nextPage.salePrice = this.selsaleUnitPrice;
        this.nextPage.currentPrice = this.selunitPrice;
        break;
      }
    }
  }
  close(): void {
    this.dialogRef.close();
    // this.statusChange.emit(true)
  }
}
