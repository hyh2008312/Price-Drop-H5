import {ChangeDetectorRef, Component, Input, OnInit, NgZone, OnChanges} from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from '../landing-page.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-flash-sale',
  templateUrl: './flash-sale.component.html',
  styleUrls: ['../_landing-page.scss']
})

export class FlashSaleComponent implements OnInit {

  @Input() flashSaleList: any = [
    {
      flashPromotionEndtime: ''
    }
  ];
  @Input() flashSaleTime: any;
  timer: any;
  ahour: any = '';
  amin: any = '';
  asecond: any = '';

  constructor(
    private router: Router,
    private landingPageService: LandingPageService,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {}

  ngOnInit():void {}
  ngOnChanges():void {
    if (this.flashSaleTime) {
      this.editTime( new Date(this.flashSaleList[0].flashPromotionEndtime).getTime() )
    }
  }

  editTime(time) {
    // const tmp = 1527753479
    const self = this
    self.ngZone.runOutsideAngular(() => {
      self.timer = setInterval(() => {
        const nowtime = new Date().getTime();
        const mytime = new Date(time).getTime();
        const total =  (mytime - nowtime) / 1000;

        const day = Math.floor(total / ( 24 * 60 * 60));//整天

        const afterDay = total - day * 24 * 60 * 60;
        self.ahour = Math.floor(afterDay / ( 60 * 60 )); //小时


        const afterHour = total - day * 24 * 60 * 60 - self.ahour * 60 * 60;
        self.amin = Math.floor(afterHour / 60); //分钟
        if ( self.amin < 10) {
          self.amin = '0' + self.amin
        }
        const afterMin = total - day * 24 * 60 * 60 - self.ahour * 60 * 60 - self.amin * 60;

        self.asecond = Math.floor(afterMin);//秒
        if ( self.asecond < 10) {
          self.asecond = '0' + self.asecond
        }

        // 加上减掉的天数
        self.ahour += (day * 24)
        if (self.ahour < 10) {
          self.ahour = '0' + self.ahour
        }
        if ((self.ahour.toString()).indexOf('-') > 0) {
          this.ahour= '00';
          this.amin= '00';
          this.asecond= '00';
        }
        if (!self.changeDetectorRef['destroyed']) {
          self.changeDetectorRef.detectChanges();
        }
      }, 1000)
    })
    // alert(time / (24 * 3600 * 1000))
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
