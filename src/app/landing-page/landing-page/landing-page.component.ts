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

  constructor(
    private router: Router,
    private landingPageService: LandingPageService,
    private userService: UserService
  ) {}

  ngOnInit():void {
    this.getBanner();
    this.getNotification();
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
}
