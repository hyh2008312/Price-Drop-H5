import {Component, OnInit, ChangeDetectorRef, NgZone, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

// import { LoginService } from '../user-share.service';
// import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { DropsService } from '../drops.service';
import { GuardLinkService } from '../../shared/services/guard-link/guard-link.service';
// import { UserService } from '../../shared/services/user/user.service';

// import {FaqDialogComponent} from '../faq-dialog/faq-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './user-share.component.html',
  styleUrls: ['./_user-share.scss']
})

export class UserShareComponent implements OnInit, OnDestroy {

  showLoading = false;
  loadingValue: any = 0;
  color = 'Accent';

  loginLink: any = false;

  sub: any;
  cutid: any;
  inLogin: any;
  ownerimg: any;
  imgsrc: any;
  someGoodsList: any;
  lowestPrice: any;
  iconpercentage: any;
  percentage: any;
  wordPercentage: any;
  wordPercentageNum: any;
  ahour: any;
  amin: any;
  asecond: any;
  title: any;
  currentPrice: any;
  salePrice: any;
  topPrice: any;
  user: any;
  cutStatus: 'progressing';
  friendCuts: any;
  cutamount: any = 111;
  cancut: any;
  faqStauts: any = false;
  cutPriceStauts: any = false;
  userArr: any;
  hasfriends: any;
  aboutProduct: any;
  priceOff: any;
  sUserAgent: any;
  dropObj: any = {};
  timer: any;

  sub1: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    // private auth: AuthenticationService,
    private dropsService: DropsService,
    public activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private guardLinkService: GuardLinkService,
    // private userService: UserService,
    private ngZone: NgZone
  ) {
    this.getDropDetail()

  }
  ngOnInit(): void {

  }
  openFaq(event) {}
  getDropDetail() {
    const self = this
    self.cutid = self.activatedRoute.snapshot.params['cutId'];
    // self.cutid = 86;
    self.dropsService.getDropDetail(self.cutid).then((res) => {
      if (res === undefined) {
        return
      }
      const data = {
        description: '#PriceDrop - Go to page & help me drop the price of ' + res.title + ' to Rs.' + res.lowestPrice + ' ! You can also get it for FREE.',
        title: 'Help Me Drop The Price to Rs. 0!',
        shareImage: res.mainImage,
      }
      this.dropObj = res
      this.imgsrc = res.avatar
      this.percentage = Math.ceil(((5 - res.friendsDrop.length) / 5 ) * 100 ) + '%';
      // this.percentage = '0%';
      if (this.dropObj.dropStatus == 'progressing') {
        this.editTime(this.dropObj.endTimestamp)
      } else {
        this.editTime(this.dropObj.cancelTimestamp)
      }
      this.getSomeGoods()
      // console.log(res)
    })
  }
  getSomeGoods() {
    const self = this
    // self.cutid = self.activatedRoute.snapshot.params['cutId'];
    self.cutid = 86;
    self.dropsService.getSomeGoods().then((res) => {
      if (res === undefined) {
        return
      }
      this.someGoodsList = [...res]
    })
  }
  editTime(time) {
    // const tmp = 1527753479
    const self = this
    self.ngZone.runOutsideAngular(() => {
      self.timer = setInterval(() => {
        const nowtime = new Date().getTime()
        const mytime = new Date(time).getTime()
        const total =  (mytime - nowtime) / 1000

        const day = Math.floor(total / ( 24 * 60 * 60))//整天

        const afterDay = total - day * 24 * 60 * 60;
        self.ahour = Math.floor(afterDay / ( 60 * 60 )); //小时


        const afterHour = total - day * 24 * 60 * 60 - self.ahour * 60 * 60;
        self.amin = Math.floor(afterHour / 60); //分钟
        if ( self.amin < 10) {
          self.amin = '0' + self.amin
        }
        const afterMin = total - day * 24 * 60 * 60 - self.ahour * 60 * 60 - self.amin * 60;

        self.asecond = Math.floor(afterMin)//秒
        if ( self.asecond < 10) {
          self.asecond = '0' + self.asecond
        }

        // 加上减掉的天数
        self.ahour += (day * 24)
        if (self.ahour < 10) {
          self.ahour = '0' + self.ahour
        }
        if ((self.ahour.toString()).indexOf('-') > 0) {
          this.ahour= '00'
          this.amin= '00'
          this.asecond= '00'
        }
        if (!self.changeDetectorRef['destroyed']) {
          self.changeDetectorRef.detectChanges();
        }
      }, 1000)
    })
    // alert(time / (24 * 3600 * 1000))
  }
  downApp() {
    // window.navigator
    const  sUserAgent: any = navigator.userAgent.toLowerCase();
    this.sUserAgent = sUserAgent
    const  bIsIpad = sUserAgent.match(/ipad/i) === 'ipad';
    const  bIsIphoneOs = sUserAgent.match(/iphone os/i) === 'iphone os';
    const  bIsMidp = sUserAgent.match(/midp/i) === 'midp';
    const  bIsQQ= sUserAgent.indexOf('mqqbrowser') > -1
    const  bIsUc =  sUserAgent.indexOf('ucbrowser') > -1
    const  bIsAndroid = sUserAgent.match(/android/i) === 'android';
    if (bIsAndroid || bIsUc ||bIsQQ ) {
      window.open('market://details?id=com.socialcommer.wx')
      // window.open('https://www.getpricedrop.com/')
    } else {
      window.open('https://play.google.com/store/apps/details?id=com.socialcommer.wx&referrer=utm_source%3Dh5page%26utm_medium%3Dpage')

    }
    // if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid) {
    //   window.open('market://details?id=com.socialcommer.wx')
    //   window.open('https://www.getpricedrop.com/')
    // } else {
    //   window.open('https://www.getpricedrop.com/')
    //
    // }
  }
  jumpApp(){
    // window.open('http://price_drop://price_drop_app/OpenPriceDropApp')
    // window.location.href = 'price_drop://price_drop_app'
  }

  ngOnDestroy() {
  }

  private load() {
    if (this.loadingValue < 90) {
      this.loadingValue++;
    } else {
      return;
    }

    requestAnimationFrame(() => this.load());

  }
}
