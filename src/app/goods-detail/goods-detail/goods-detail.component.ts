import { Component, OnInit, Input, ViewChild, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { GoodsDetailService } from '../goods-detail.service';
import { OrderService } from '../../shared/services/order/order.service';
import { GoodsVariantDialogComponent } from '../variant-dialog/goods-variant-dialog.component';
import { GuardLinkService} from '../../shared/services/guard-link/guard-link.service';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import { UserService } from '../../shared/services/user/user.service';
import {RewardPointsDialogComponent} from '../reward-points-dialog/reward-points-dialog.component';
import {ShipCostDialogComponent} from '../ship-cost-dialog/ship-cost-dialog.component';

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
  flashSale: any = {};
  addHeight: any = true;
  isLogin = false;
  ahour: any = 11;
  amin: any = 12;
  asecond: any = 13;
  @ViewChild('scroll') scroll;

  constructor(
    private router: Router,
    private goodsDetailService: GoodsDetailService,
    private orderService: OrderService,
    private auth: AuthenticationService,
    public dialog: MatDialog,
    private guardLinkService: GuardLinkService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone
  ) {
    this.auth.isOnlyAuthorized().subscribe((res) => {
      if (res) {
        this.isLogin = true;
      }
    });
    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
    this.userService.addNavigation('Product Detail');

    this.activatedRoute.params.subscribe((data) => {
      if(data) {
        this.productId = data.id;
        this.getGoodsDetail();
        this.getRecommendGoods();
      }
    });
  }

  ngOnInit():void {}

  getGoodsDetail() {
    this.banner = [];
    this.goodsDetailService.getGoodsDetail(this.productId).then((res) => {
      this.scroll.nativeElement.scrollTop = 0;
      this.banner = [...res.images];
      this.goods = res;

      this.nextPage.title = res.title;
      this.nextPage.productId = this.productId;
      this.nextPage.proId = res.purchaseMethod;
      if (this.nextPage.proId === 'flash') {
        this.flashSale = res.flashSale;
        this.nextPage.flashSale = res.flashSale;
      }
      if (res.images != null) {
        this.selimgsrc = res.images[0];
        this.nextPage.mainImage = this.selimgsrc;
      } else {
        this.selimgsrc = '';
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
        this.openVariant(Event);
      } else {
        console.log(this.nextPage);
        if (this.nextPage.proId =='flash' && this.flashSale.flashStatus =='Ongoing') {
          this.nextPage.id = this.variantsId;
          this.nextPage.currentPrice = this.calc(this.nextPage.currentPrice , this.flashSale.discount);
        }
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

    } else {
      this.guardLinkService.addRouterLink(window.location.pathname);
      this.router.navigate([`/account/login`]);
    }
  }
  openShip(){
    let dialogRef = this.dialog.open(ShipCostDialogComponent, {
      data: {
        ship: this.goods.shipping
      },
      position: {
        bottom: '0',
        left: '0'
      }
    });
  }
  openReward(){
    let dialogRef = this.dialog.open(RewardPointsDialogComponent, {

      position: {
        bottom: '0',
        left: '0'
      }
    });
  }
  countPoints (p, a, b) {
    return (Math.floor(parseInt(p) / a)) * b;
  }
  calc (a, b) {
    return ((a * b) / 100).toFixed(2)
  }
}

