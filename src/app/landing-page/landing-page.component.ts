import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/services/user/user.service';

import {LandingPageService} from './landing-page.service';

import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface
} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./_landing-page.scss']
})

export class LandingPageComponent implements OnInit {

  currency: string = 'USD';

  disabled: boolean = false;

  public show: boolean = true;

  public type: string = 'component';

  public slides1:any;

  public config1: SwiperConfigInterface = {
    observer: true,
    threshold: 50,
    direction: 'horizontal',
    slidesPerView: 5,
    speed: 800,
    autoplay: {
      delay: 5000
    },
    loop: true,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    navigation: false,
    pagination: false,
    breakpoints: {
      959: {
        slidesPerView: 3
      },
      600: {
        slidesPerView: 3,
        autoplay: false
      }
    }
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private landingPageService: LandingPageService
  ) {
    this.getProductList();
  }

  ngOnInit():void {
    this.activatedRoute.queryParams.subscribe((data)=> {
      if(Object.keys(data).length > 0) {
        let ads: any = {};
        if(data.utm_source) {
          ads.utm_source = data.utm_source;
        }
        if(data.utm_medium) {
          ads.utm_medium = data.utm_medium;
        }
        if(data.utm_campaign) {
          ads.utm_campaign = data.utm_campaign;
        }
        if(data.utm_term) {
          ads.utm_term = data.utm_term;
        }
        if(data.utm_content) {
          ads.utm_content = data.utm_content;
        }

        this.userService.addCurrentAds(ads);
      }
    });
  }

  public onIndexChange1(index: number): void {}

  getProductList() {
    this.landingPageService.getProductList().then((data) => {
      this.slides1 = [...data];
      this.slides1.push(...data);
    });
  }


}
