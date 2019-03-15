import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GoodsDetailService } from '../goods-detail.service';
import { MatDialog } from '@angular/material';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-size-color',
  templateUrl: './size-color.component.html',
  styleUrls: ['../_goods-detail.scss']
})
export class SizeColorComponent implements OnInit {

  @Input() goods: any = {};
  goodsType: any =  {};
  goodsVariants: any =  {};
  tmpArray: any =  {};
  hasVariants:any;
  variantsId:any;
  canBuy:any;
  selsaleUnitPrice: any;
  selcolor: any;
  selsize: any;
  selunitPrice: any;
  selimgsrc: any;
  nextPage: any = {
    title: '',
    mainImage: '',
    salePrice: '',
    currentPrice: '', // 计算价钱的金额
    attributes: '',
    productId: '',
    quantity: '1',
    id: '',
    shippingPrice: '',
    shippingTimeMin: '',
    shippingTimeMax: '',
    processingTimeMin: '',
    processingTimeMax: '',
    proId: '',
    flashSale: {}
  };
  ahour: any = 11;
  amin: any = 12;
  asecond: any = 13;

  constructor(
    private router: Router,
    private goodsDetailService: GoodsDetailService,
    private matDialog: MatDialog
  ){}


  ngOnInit():void {
    // this.getGoodsDetail();
  }
  handlerGoods(){
    if (this.goods.images != null) {
      this.selimgsrc = this.goods.images[0]
      this.nextPage.mainImage = this.selimgsrc
    } else {
      this.selimgsrc = ''
    }

    if (this.goods.attributes != null && this.goods.attributes.length > 0) {
      if (this.goodsVariants.length == 1) {
        this.hasVariants = false;
        this.nextPage.attributes = '';
        this.goodsType = [];
        this.canBuy = this.goods.variants[0].isCanBuy;
        this.variantsId = this.goods.variants[0].id;

        this.nextPage.id = this.goods.variants[0].id;
        this.nextPage.salePrice = this.goods.variants[0].saleUnitPrice;
        this.nextPage.currentPrice = this.goods.variants[0].unitPrice;
      } else {
        this.goodsType = this.goods.attributes;
        this.operateData(this.goods.attributes);
      }
    } else {
      this.hasVariants = false;
      this.nextPage.attributes = '';
      this.goodsType = [];
      this.canBuy = this.goods.variants[0].isCanBuy;
      this.variantsId = this.goods.variants[0].id;
      this.nextPage.id = this.goods.variants[0].id;
      this.nextPage.salePrice = this.goods.variants[0].saleUnitPrice;
      this.nextPage.currentPrice = this.goods.variants[0].unitPrice;
      // this.nextPage.mainImage =
    }
  }
  operateData (data) {
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
  checkedSelected () {
    this.tmpArray = [];
    for (let i = 0; i < this.goodsType.length; i++) {
      for (let j = 0; j < this.goodsType[i].value.length; j++) {
        if (this.goodsType[i].value[j].isActive == true) {
          this.tmpArray.push(this.goodsType[i].value[j])
          break;
        }
        if (j == this.goodsType[i].value.length - 1) {
          // this.$notice.toast({
          //   message: 'Please select a ' + this.goodsType[i].name.toLowerCase() + '!'
          // });
          return false
        }
      }
    }
    return true;
  }
}

