import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from '../landing-page.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['../_landing-page.scss']
})

export class CommodityComponent implements OnInit {

  @Input() commodityProductList: any = [];
  products: any = [];

  constructor(
    private router: Router,
    private landingPageService: LandingPageService
  ) {}

  ngOnInit():void {
  }
  countOff (s, o) {
    if (o > 0) {
      return Math.ceil((o - s) / o * 100) + '%'
    } else {
      return ''
    }
  }
  tranArr (data) {
    let arr = [];
    const rArr = [];
    // this.$notice.alert({
    //     message: data
    // })
    // if (data.length >= 4) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      arr.push(item);
      if ((i > 0 && i % 3 === 2) || i === data.length - 1) {
        rArr.push(arr);
        arr = [];
      }
    }
    // this.$notice.alert({
    //     message: rArr[0]
    // })
    return rArr //  4个一个的二维数组
    // } else {
    //
    //     return data
    // }
  }
}
