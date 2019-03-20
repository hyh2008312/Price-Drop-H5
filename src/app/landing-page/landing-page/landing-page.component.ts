import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from '../landing-page.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['../_landing-page.scss']
})

export class LandingPageComponent implements OnInit {

  selector = '.main-panel';
  banner: any = [];
  notification: any = [];
  flashSaleList: any = [];
  commodityProductList: any = [];
  buffer:any = [];
  flashSaleTime: any;
  ahour: any = 11;
  amin: any = 12;
  asecond: any = 13;
  loading: boolean = false;
  addHeight: any = false;
  page: any = 1;
  pageSize: any = 12;
  value = 36;

  constructor(
    private router: Router,
    private landingPageService: LandingPageService,
    private userService: UserService
  ) {
    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
  }

  ngOnInit():void {
    this.getBanner();
    this.getNotification();
    this.getFlashSale();
    this.getCommodityProduct();
    this.getFeaturedProduct(1);
    this.userService.addNavigation('PriceDrop');
  }

  getBanner() {
    this.landingPageService.getBanner().then((res) => {
      for(let item of res) {
        this.banner.push(item.image);
      }
    });
  }

  getNotification() {
    let param: any = {};
    param.placement = 'Home';
    this.landingPageService.getNotification(param).then((res) => {
      this.notification = [...res];
      console.log(this.notification)
    });
  }
  getFlashSale() {
    this.landingPageService.getFlashSale().then((res) => {
      if (res.length > 0) {
        this.flashSaleList = res.splice(0, 3);
        this.flashSaleTime = new Date(this.flashSaleList[0].flashPromotionEndtime).getTime();
      }
    });
  }
  getCommodityProduct() {
    this.landingPageService.getCommodityProduct().then((res) => {
      if (res) {
        this.commodityProductList = res
      }
    });
  }
  getFeaturedProduct(page) {
    this.landingPageService.getFeaturedProduct({'page': page , page_size: this.pageSize}).then((res) => {
      if (res) {
        // this.featuredProductList = res
        this.buffer = this.buffer.concat(this.tranArr(res.results));
        this.page++;
        this.loading = false;
      }
    });
  }

  tranArr (data) {
    let arr = [];
    let goods3 = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      arr.push(item);
      if ((i > 0 && i % 2 === 1) || (i === data.length - 1)) {
        goods3.push(arr);
        arr = [];
      }
    }
    return goods3
  }

  onUp(ev) {
    console.log('scrolled up!', ev);
  }

  onScrollDown (ev) {
    this.loading = true;
    this.getFeaturedProduct(this.page);
  }

}

