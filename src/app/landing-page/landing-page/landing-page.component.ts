import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from '../landing-page.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['../_landing-page.scss']
})

export class LandingPageComponent implements OnInit {

  banner: any = [];
  notification: any = [];
  flashSaleList: any = [];
  commodityProductList: any = [];
  buffer:any = [];
  featuredProductList: any = [];
  flashSaleTime: any;
  ahour: any = 11;
  amin: any = 12;
  asecond: any = 13;

  constructor(
    private router: Router,
    private landingPageService: LandingPageService,
    private userService: UserService
  ) {}

  ngOnInit():void {
    this.getBanner();
    this.getNotification();
    this.getFlashSale();
    this.getCommodityProduct();
    this.getFeaturedProduct();
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
  getFeaturedProduct() {
    this.landingPageService.getFeaturedProduct().then((res) => {
      console.log(res.results)
      if (res) {
        // this.featuredProductList = res
        this.featuredProductList = this.tranArr(res.results);

        this.buffer.push(...this.featuredProductList);
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
}

