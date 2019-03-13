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

  countOff (s, o) {
    if (o > 0) {
      return Math.ceil((o - s) / o * 100) + '%'
    } else {
      return ''
    }
  }
  countPrice (s, o) {
    if (o > 0) {
      return Math.floor(s * (o / 100))  // 解决多一块钱的问题
    } else {
      return ''
    }
  }
}
