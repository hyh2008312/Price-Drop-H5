import {Component, OnInit, ChangeDetectorRef, NgZone, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

// import { LoginService } from '../user-share.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { DropsService } from '../drops.service';
import { GuardLinkService } from '../../shared/services/guard-link/guard-link.service';
import { UserService } from '../../shared/services/user/user.service';
import { MatDialog } from '@angular/material';

import {FaqDialogComponent} from '../faq-dialog/faq-dialog.component';

import {CutPriceDialogComponent} from '../cut-price-dialog/cut-price-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './user-share.component.html',
  styleUrls: ['./_user-share.scss'],
  entryComponents: [FaqDialogComponent, CutPriceDialogComponent]
})

export class UserShareComponent implements OnInit, OnDestroy {

  showLoading = false;
  loadingValue: any = 0;
  color = 'Accent';

  loginLink: any = false;

  sub: any;
  cutid: any;
  ownerimg: any;
  imgsrc: any;
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
  cutStatus: any;
  friendCuts: any;
  cutamount: any = 111;
  cancut: any;
  faqStauts: any = false;
  cutPriceStauts: any = false;
  userArr: any;
  hasfriends: any;
  aboutProduct: any;
  priceOff: any;
  isMe: any;
  bindNum: any = false;


  sUserAgent: any;

  isLogin = false;
  timer: any;

  isFirstCut: any = null;

  sub1: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private dropsService: DropsService,
    public activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private guardLinkService: GuardLinkService,
    private userService: UserService,
    private ngZone: NgZone,
    public dialog: MatDialog,
  ) {
    this.sub = this.guardLinkService.routerLink.subscribe((data) => {
      if (data) {
        this.loginLink = data
      }
    });

    this.userService.currentUser.subscribe((data) => {
      if(data!=null){
        if (data.bindMobile!="") {
          this.bindNum = true
        } else {
          this.bindNum = false
        }
      }

    })

    this.auth.isOnlyAuthorized().subscribe((data) => {
      if (data) {
        this.isLogin = true
      }

      this.getCutdetail()

    });


  }
  ngOnInit(): void {

  }

  getCutdetail() {
    const self  = this
    console.log(window.location.pathname)
    self.cutid = self.activatedRoute.snapshot.params['cutId'];
    self.dropsService.getCutDetail(self.cutid, this.isLogin).then((res) => {
      if (res === undefined) {
        return
      }
      const data = {
        description: '#PriceDrop - Go to page & help me drop the price of ' + res.title + ' to Rs.' + res.lowestPrice + ' ! You can also get it for FREE.',
        title: 'Help Me Drop The Price to Rs. 0!',
        shareImage: res.mainImage,
      }
      this.dropsService.addTitleDescription(data)
      this.cancut = res.canCut
      this.title = res.title
      this.salePrice = res.salePrice
      this.lowestPrice = res.lowestPrice
      this.currentPrice = res.currentPrice
      // this.currentPrice = '5.00'
      this.priceOff = parseInt(((((res.salePrice * 100 - res.currentPrice * 100) / 100) / (res.salePrice * 1- res.lowestPrice * 1)) * 100).toString())

      console.log( ((res.salePrice * 100 - res.currentPrice * 100) / 100) / (res.salePrice * 1 ) )

      this.percentage = Math.ceil((this.salePrice - this.currentPrice) / (this.salePrice - this.lowestPrice) * 100) + '%';

      this.wordPercentageNum = Math.ceil((this.salePrice - this.currentPrice) / (this.salePrice - this.lowestPrice) * 100)
      // let wordPercentageNum = 99

      if ( this.wordPercentageNum > 85) {
        this.wordPercentage = 84 + '%'
      } else {
        this.wordPercentage = Math.ceil((this.salePrice - this.currentPrice) / (this.salePrice - this.lowestPrice) * 100) + '%';
      }

      this.iconpercentage = Math.ceil(((this.salePrice - this.currentPrice) / (this.salePrice - this.lowestPrice)  * 100) - 4) + '%';
      this.imgsrc = res.mainImage
      this.ownerimg = res.ownerAvatar
      this.cutStatus = res.cutStatus
      this.aboutProduct = res.choiceProduct

      const tmparr = res.friendCuts
      if (tmparr.length >= 4) {
        this.userArr = tmparr.slice(0, 5)
      } else {
        this.userArr = []
      }

      if (tmparr.length > 0) {
        this.hasfriends = res.friendCuts.length
        this.arrSort(tmparr)
      }
      this.user = res.user
      if ((this.salePrice - this.currentPrice).toString().indexOf('.') == -1) {
        this.topPrice = (this.salePrice - this.currentPrice).toString() + '.00'
      } else {
        this.topPrice = (this.salePrice - this.currentPrice).toString().substring(0, (this.salePrice - this.currentPrice).toString().indexOf('.') + 3)
      }
      if (this.cutStatus == 'progressing') {
        this.editTime(res.endTimestamp)
      } else {
        this.ahour = '00'
        this.amin = '00'
        this.asecond = '00'
      }

      this.sub1 = this.userService.inLogin.subscribe((data) => {
        this.isFirstCut = data;
        if (this.isFirstCut === true && this.cancut === true) {
          this.cutPrice()
        }
      })

      // this.showBtn()
    }).catch((res) => {


      console.log('getCutdetail-------catch' + res)
    })
  }
  arrSort(arr) {
    const moneyArr  = arr
    const timeArr  = arr
    console.log(timeArr)


    for (let i = 0; i < moneyArr.length; i++) {
      for (let j = i + 1; j < moneyArr.length; j++) {
        if (parseInt(moneyArr[i].cutAmount) < parseInt(moneyArr[j].cutAmount)) {
          const tmp = moneyArr[i];
          moneyArr[i] = moneyArr[j];
          moneyArr[j] = tmp;
        }
      }
    }
    const  sortArr = moneyArr.slice(0, 4)
    // const  sortArr = moneyArr
    this.friendCuts = sortArr; // 钱数最多的排序

  }
  editTime(time) {
    // const tmp = 1527753479
    const self = this
    self.ngZone.runOutsideAngular(() => {
      self.timer = setInterval(() => {
        const nowtime = new Date
        const total =  time - nowtime.getTime() / 1000

        const day = Math.floor(total / ( 24 * 60 * 60))//整天

        const afterDay = total - day * 24 * 60 * 60;
        self.ahour = Math.floor(afterDay / ( 60 * 60 )); //小时
        if ( self.ahour < 10) {
          self.ahour = '0' + self.ahour
        }
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

        if (!self.changeDetectorRef['destroyed']) {
          self.changeDetectorRef.detectChanges();
        }
      }, 1000)
    })
    // alert(time / (24 * 3600 * 1000))
  }
  cutPrice() {
    const self  = this
    if (this.isLogin && this.bindNum ) {
      if(this.user === 'friend'){
        self.dropsService.friendCutPrice(self.cutid).then((res) => {
          const tmpcut  = res.cutAmount
          this.cutamount = tmpcut
          this.cancut = res.canCut
          this.currentPrice = res.currentPrice
          this.percentage = Math.ceil((this.salePrice - res.currentPrice  ) / (this.salePrice - this.lowestPrice) * 100) + '%';
          const wordPercentageNum = Math.ceil((this.salePrice - this.currentPrice) / (this.salePrice - this.lowestPrice) * 100)
          // let wordPercentageNum = 99

          if ( wordPercentageNum > 85) {
            this.wordPercentage = 90 + '%'
          } else {
            this.wordPercentage = Math.ceil((this.salePrice - this.currentPrice) / (this.salePrice - this.lowestPrice) * 100) + '%';
          }
          this.iconpercentage = Math.ceil(((this.salePrice - res.currentPrice ) / (this.salePrice - this.lowestPrice)  * 100) - 4) + '%';
          const tmparr = res.friendCuts
          if (tmparr.length >= 4) {
            this.userArr = tmparr.slice(0, 5)
          } else {
            this.userArr = []
          }
          this.arrSort(res.friendCuts)
          this.openCutPrice(Event,false)
        }).catch((res) => {
          console.log('cutPrice--------catch:' + res)
        })
      } else {
        this.openCutPrice(Event,true)
      }
    } else {
      self.guardLinkService.addRouterLink(window.location.pathname);
      self.router.navigate(['/account/login']);
    }

  }

  openCutPrice($event,a?:any) {
    if(a){
      this.isMe = true
    }else{
      this.isMe = false
    }

   this.cutPriceStauts = !this.cutPriceStauts

    if( $event == true) {
      window.location.hash = 'bottom-goods-head';
    }
  }
  openFaq($event) {
    this.faqStauts = !this.faqStauts
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
    if (this.changeDetectorRef) {
      this.changeDetectorRef.detach();
    }
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
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
