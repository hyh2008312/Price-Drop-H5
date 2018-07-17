import {Component, OnInit, ChangeDetectorRef, NgZone, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

// import { LoginService } from '../user-share.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { DropsService } from '../drops.service';
import { GuardLinkService } from '../../shared/services/guard-link/guard-link.service';
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
  cutamount: any;
  cancut: any;

  isLogin = false;

  timer: any = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private dropsService: DropsService,
    public activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private guardLinkService: GuardLinkService,
    private ngZone: NgZone,
    public dialog: MatDialog,
  ) {
    this.sub = this.guardLinkService.routerLink.subscribe((data) => {
      if (data) {
        this.loginLink = data;
      }
    });

    this.auth.isOnlyAuthorized().subscribe((data) => {
      if (data) {
        this.isLogin = true
      }
      this.getCutdetail()
    })

  }
  ngOnInit(): void {

  }

  getCutdetail() {
    const self  = this
    console.log(window.location.pathname)
    self.cutid = self.activatedRoute.snapshot.params['cutId'];
    self.dropsService.getCutDetail(self.cutid, this.isLogin).then((res) => {
      console.log(res)
      if (res === undefined) {
        return
      }
      const data = {
        description: res.title,
        title: 'Come help me drop the price before it sells out!',
        shareImage: res.mainImage,
      }
      this.dropsService.addTitleDescription(data)
      this.cancut = res.canCut
      this.title = res.title
      this.salePrice = res.salePrice
      this.lowestPrice = res.lowestPrice
      this.currentPrice = res.currentPrice
      // this.currentPrice = '5.00'

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
      // this.friendCuts = res.friendCuts.slice(0, 4)
      this.friendCuts = res.friendCuts
      //
      // for (let i=0;i<this.friendCuts.length; i++) {
      //   for(let j = i + 1;j<this.friendCuts.length; j++) {
      //     if(parseInt(this.friendCuts[i].cutAmount) < parseInt(this.friendCuts[j].cutAmount)) {
      //       let tmp = this.friendCuts[i];
      //       this.friendCuts[i] = this.friendCuts[j];
      //       this.friendCuts[j] = tmp;
      //     }
      //   }
      // }

      this.friendCuts.slice(0, 4)

      this.user = res.user
      if ((this.salePrice - this.currentPrice).toString().indexOf('.') == -1) {
        this.topPrice = (this.salePrice - this.currentPrice).toString() + '.00'
      } else {
        this.topPrice = (this.salePrice - this.currentPrice).toString().substring(0, (this.salePrice - this.currentPrice).toString().indexOf('.') + 3)
      }
      const nowtime = new Date
      const tmp = nowtime.getTime()
      const restmp = res.endTimestamp
      console.log(restmp - nowtime.getTime())
      if (this.cutStatus == 'progressing') {
        this.editTime(res.endTimestamp)
      } else {
        this.ahour = '00'
        this.amin = '00'
        this.asecond = '00'
      }

      // this.showBtn()
    }).catch((res) => {


      console.log('getCutdetail-------catch' + res)
    })
  }
  // showBtn() {
  //   if(this.cutStatus=='progressing'){
  //
  //   } else {
  //
  //   }
  // }
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
    // this.openCutPrice(1111)

    if (this.isLogin && this.user === 'friend') {
      self.dropsService.friendCutPrice(self.cutid).then((res) => {
        const tmpcut  = res.cutAmount
        this.cutamount = tmpcut
        this.cancut = res.canCut
        this.currentPrice = res.currentPrice
        this.percentage = Math.ceil((this.salePrice - res.currentPrice  ) / (this.salePrice - this.lowestPrice) * 100) + '%';
        const wordPercentageNum = Math.ceil((this.salePrice - this.currentPrice) / (this.salePrice - this.lowestPrice) * 100)
        // let wordPercentageNum = 99

        if ( wordPercentageNum > 85) {
          this.wordPercentage = 84 + '%'
        } else {
          this.wordPercentage = Math.ceil((this.salePrice - this.currentPrice) / (this.salePrice - this.lowestPrice) * 100) + '%';
        }
        this.iconpercentage = Math.ceil(((this.salePrice - res.currentPrice ) / (this.salePrice - this.lowestPrice)  * 100) - 4) + '%';

        this.friendCuts = res.friendCuts
        this.openCutPrice(this.cutamount)
      }).catch((res) => {
        console.log('cutPrice--------catch:' + res)
      })
    } else {
      self.guardLinkService.addRouterLink(window.location.pathname);
      // this.guardLinkService.addRouterLink(window.location.origin + '/account/login');
      self.router.navigate(['/account/login']);
    }

  }

  openCutPrice(price: any) {

    const dialogRef: any = this.dialog.open(CutPriceDialogComponent, {
      data: {
        price
      }
    });

    const self = this;
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  openFaq() {
    const dialogRef: any = this.dialog.open(FaqDialogComponent, {
      data: {}
    });

    const self = this;

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  downApp() {
    // window.navigator
    const  sUserAgent: any = navigator.userAgent.toLowerCase();
    const  bIsIpad = sUserAgent.match(/ipad/i) === 'ipad';
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
    // if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid) {
    //   window.open('market://details?id=com.socialcommer.wx')
    //   window.open('https://www.getpricedrop.com/')
    // } else {
    //   window.open('https://www.getpricedrop.com/')
    //
    // }
  }

  ngOnDestroy() {
    if (this.changeDetectorRef) {
      this.changeDetectorRef.detach();
    }
    if(this.timer) {
      clearInterval(this.timer)
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
