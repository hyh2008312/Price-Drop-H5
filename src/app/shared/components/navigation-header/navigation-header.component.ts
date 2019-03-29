import { Component } from '@angular/core';

import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./_navigation-header.scss']
})

export class NavigationHeaderComponent {

  display: boolean = true;

  constructor(
    private userService: UserService
  ) {
    this.userService.addCloseDownload(this.display);
  }

  close() {
    this.display = !this.display;
    this.userService.addCloseDownload(this.display);
  }

  download() {
    const  sUserAgent: any = navigator.userAgent.toLowerCase();
    const  bIsIpad = sUserAgent.match(/ipad/i) === 'ipad';
    const  bIsIphoneOs = sUserAgent.match(/iphone os/i) === 'iphone os';
    const  bIsMidp = sUserAgent.match(/midp/i) === 'midp';
    const  bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) === 'rv:1.2.3.4';
    const  bIsUc = sUserAgent.match(/ucweb/i) === 'ucweb';
    const  bIsAndroid = sUserAgent.match(/android/i) === 'android';
    if (bIsAndroid) {
      window.open('https://pricedrop.page.link/drops');
    } else {
      window.open('https://play.google.com/store/apps/details?id=com.socialcommer.wx&referrer=utm_source%3Dh5page%26utm_medium%3Dpage')

    }
  }


}
