import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { GoodsDetailService } from '../goods-detail.service';
import { OrderService } from '../../shared/services/order/order.service';
import { GoodsVariantDialogComponent } from '../variant-dialog/goods-variant-dialog.component';
import { GuardLinkService} from '../../shared/services/guard-link/guard-link.service';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';

@Component({
  selector: 'app-goods-detail',
  templateUrl: './goods-detail.component.html',
  styleUrls: ['../_goods-detail.scss']
})

export class GoodsDetailComponent implements OnInit {

  @Input() selimgsrc: any;
  banner: any = [];
  goods: any = {};
  recommendGoods;
  productId: any = '';
  variantsId: any = '';
  hasVariants: any = true;
  canBuy: any = true;
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

  isLogin = false;
  ahour: any = 11;
  amin: any = 12;
  asecond: any = 13;

  constructor(
    private router: Router,
    private goodsDetailService: GoodsDetailService,
    private orderService: OrderService,
    private auth: AuthenticationService,
    public dialog: MatDialog,
    private guardLinkService: GuardLinkService,
    private activatedRoute: ActivatedRoute
  ) {
    this.auth.isOnlyAuthorized().subscribe((res) => {
      if (res) {
        this.isLogin = true;
      }
    });

    this.productId = this.activatedRoute.snapshot.params['id'];
    this.getGoodsDetail();
    this.getRecommendGoods();
  }

  ngOnInit():void {}

  getGoodsDetail() {
    this.goodsDetailService.getGoodsDetail(this.productId).then((res) => {
      this.banner = res.images;
      this.goods = res;

      this.nextPage.title = res.title;
      this.nextPage.productId = this.productId;
      this.nextPage.proId = res.purchaseMethod;
      if (res.images != null) {
        this.selimgsrc = res.images[0];
        this.nextPage.mainImage = this.selimgsrc
      } else {
        this.selimgsrc = ''
      }

      this.nextPage.shippingPrice = res.shipping.priceItem;
      this.nextPage.shippingTimeMin = res.shipping.shippingTimeMin;
      this.nextPage.shippingTimeMax = res.shipping.shippingTimeMax;

      this.nextPage.processingTimeMin = res.shipping.processingTimeMin;
      this.nextPage.processingTimeMax = res.shipping.processingTimeMax;
      if (res.attributes != null && res.attributes.length > 0) {
        if (res.variants.length == 1) {
          this.hasVariants = false;
          this.nextPage.attributes = '';
          this.canBuy = res.variants[0].isCanBuy;
          this.variantsId = res.variants[0].id;

          this.nextPage.id = res.variants[0].id;
          this.nextPage.salePrice = res.variants[0].saleUnitPrice;
          this.nextPage.currentPrice = res.variants[0].unitPrice;
        } else {
          // this.goodsType = res.attributes;
          // this.operateData(res.attributes);
        }
      } else {
        this.hasVariants = false;
        this.nextPage.attributes = '';
        this.canBuy = res.variants[0].isCanBuy;
        this.variantsId = res.variants[0].id;
        this.nextPage.id = res.variants[0].id;
        this.nextPage.salePrice = res.variants[0].saleUnitPrice;
        this.nextPage.currentPrice = res.variants[0].unitPrice;
      }
      // console.log(res)
    });
  }
  getRecommendGoods() {
    this.goodsDetailService.getRecommendGoods(this.productId).then((res) => {
      this.recommendGoods = res;
    });
  }
  getNowDay1 (str: any) {
    if (str) {
      const date = new Date().getTime();
      return new Date(date + ((24 * 60 * 60 * 1000) * (7 + str)));
    } else {
      return new Date();
    }
  }
  buyNow () {
    if (this.isLogin) {
      if (this.hasVariants) {
        this.openVariant(Event)
      } else {
        console.log(this.nextPage);
        this.orderService.addOrder(this.nextPage);
        this.router.navigate([`/order/confirmOrder`]);
      }
    } else {
      this.guardLinkService.addRouterLink(window.location.pathname);
      this.router.navigate([`/account/login`]);
    }
  }
  openVariant($event,a?:any) {
    if (this.isLogin) {
      let dialogRef = this.dialog.open(GoodsVariantDialogComponent, {
        data: {
          goods: this.goods
        },
        position: {
          bottom: '0',
          left: '0'
        }
      });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log(dialogRef.componentInstance.data.aa);
      // });
    } else {
      this.guardLinkService.addRouterLink(window.location.pathname);
      this.router.navigate([`/account/login`]);
    }
  }
  countPoints (p, a, b) {
    return (Math.floor(parseInt(p) / a)) * b;
  }
  calc (a, b) {
    return ((a * b) / 100).toFixed(2)
  }
}

