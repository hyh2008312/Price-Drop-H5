import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';




@Component({
  selector: 'cut-price-dialog',
  templateUrl: './cut-price-dialog.component.html',
  styleUrls: ['./_cut-price-dialog.scss']
})

export class CutPriceDialogComponent implements OnInit {

  @Output() statusChange: any = new EventEmitter();
  @Input() data: any;
  @Input() isMe: any;
  @Input() errMsg: any;
  isM: any = false;

  constructor() {

  }

  ngOnInit(): void {
    this.isM = this.isMe
  }
  openLink() {

    // https://play.google.com/store/apps/details?id=com.socialcommer.wx
    // window.navigator

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
  close(): void {
    this.statusChange.emit(true)
  }
}
