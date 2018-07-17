import {Component, Inject, OnInit, ChangeDetectorRef} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'cut-price-dialog',
  templateUrl: './cut-price-dialog.component.html',
  styleUrls: ['./_cut-price-dialog.scss']
})

export class CutPriceDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<CutPriceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {

  }

  ngOnInit(): void {
    (<any>window).dataLayer.push({
      'event': 'VirtualPageView',
      'virtualPageURL': '/droppedtheprice',
      'virtualPageTitle': 'Dropped The Price'
    });
  }
  openLink() {

    // https://play.google.com/store/apps/details?id=com.socialcommer.wx
    // window.navigator

    const  sUserAgent: any = navigator.userAgent.toLowerCase();
    const  bIsIpad = sUserAgent.match(/ipad/i) === 'ipad'
    const  bIsIphoneOs = sUserAgent.match(/iphone os/i) === 'iphone os';
    const  bIsMidp = sUserAgent.match(/midp/i) === 'midp';
    const  bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) === 'rv:1.2.3.4';
    const  bIsUc = sUserAgent.match(/ucweb/i) === 'ucweb';
    const  bIsAndroid = sUserAgent.match(/android/i) === 'android';
    if (bIsAndroid) {
      window.open('market://details?id=com.socialcommer.wx')
      // window.open('https://www.getpricedrop.com/')

    } else {
      window.open('https://play.google.com/store/apps/details?id=com.socialcommer.wx&referrer=utm_source%3Dh5page%26utm_medium%3Dpage')

    }
  }
  close(): void {
    this.dialogRef.close();
  }
}
