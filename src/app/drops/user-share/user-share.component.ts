import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone,  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { LoginService } from '../user-share.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { DropsService } from '../drops.service';
import { GuardLinkService } from '../../shared/services/guard-link/guard-link.service';
import { MatDialog } from '@angular/material';

import {Response} from '@angular/http';
import {FaqDialogComponent} from '../faq-dialog/faq-dialog.component';

import {CutPriceDialogComponent} from '../cut-price-dialog/cut-price-dialog.component';

// import { AuthService } from "angular2-social-user-share";

@Component({
  selector: 'app-login',
  templateUrl: './user-share.component.html',
  styleUrls: ['./_user-share.scss']
})

export class UserShareComponent implements OnInit {

  loginGroup : FormGroup;

  loginErr : any = false;

  token: any;

  showLoading: boolean = false;
  loadingValue: any = 0;
  color: string = 'Accent';

  googleLoginSub: any;

  loginLink: any = false;

  sub: any;
  cutid: any;
  ownerimg: any;
  imgsrc: any;
  currentPrice: any;
  lowestPrice: any;
  iconpercentage: any;
  percentage: any;
  ahour: any;
  amin: any;
  asecond: any;
  title: any;
  salePrice: any;
  user: any;
  cutStatus: any;
  friendCuts: any;
  cutamount: any;
  cancut: any;

  isLogin: boolean = false;

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
      if(data) {
        this.loginLink = data;
      }
    });

    this.auth.isOnlyAuthorized().subscribe((data) => {
      if (data) {
        this.isLogin = true
      }
    })

  }
  ngOnInit(): void {
    this.getCutdetail()
  }

  getCutdetail() {
    const self  = this
    console.log(window.location.pathname)
    self.cutid = self.activatedRoute.snapshot.params['cutId'];
    self.dropsService.getCutDetail(self.cutid).then((res) => {

      console.log(res)
      let data = {
        description: res.title,
        title: res.title,
        shareImage: res.mainImage,
      }
      this.dropsService.addTitleDescription(data)
      this.cancut = res.canCut
      console.log(res.canCut)
      this.title = res.title
      this.salePrice = res.salePrice
      this.lowestPrice = res.lowestPrice
      this.currentPrice = res.currentPrice
      // this.currentPrice = '5.00'

      this.percentage = Math.ceil((this.salePrice - this.currentPrice) / (this.salePrice - this.lowestPrice) * 100) + '%';

      this.iconpercentage = Math.ceil(((this.salePrice - this.currentPrice) / (this.salePrice - this.lowestPrice)  * 100) - 4) + '%';
      this.imgsrc = res.mainImage
      this.ownerimg = res.ownerAvatar
      this.cutStatus = res.cutStatus
      this.friendCuts = res.friendCuts
      this.user = res.user


      let nowtime = new Date
      let tmp = nowtime.getTime()
      let restmp = res.endTimestamp
      console.log(restmp - nowtime.getTime())
      if (this.cutStatus == 'progressing'){
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
    let self = this
    self.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        let nowtime = new Date
        const total =  time - nowtime.getTime() / 1000

        const day = Math.floor(total / ( 24 * 60 * 60))//整天

        const afterDay = total - day * 24 * 60 * 60;
        self.ahour = Math.floor(afterDay / ( 60 * 60 ));//小时
        if( self.ahour < 10){
          self.ahour = '0' +self.ahour
        }
        const afterHour = total - day * 24 * 60 * 60 - self.ahour * 60* 60;
        self.amin = Math.floor(afterHour / 60);//分钟
        if( self.amin < 10){
          self.amin = '0' +self.amin
        }
        const afterMin = total - day * 24 * 60 * 60 - self.ahour * 60 * 60 - self.amin* 60;

        self.asecond = Math.floor(afterMin)//秒
        if( self.asecond < 10){
          self.asecond = '0' + self.asecond
        }

        self.changeDetectorRef.detectChanges();
      },1000)
    })
    // alert(time / (24 * 3600 * 1000))
  }
  cutPrice() {
    const self  = this
    this.openCutPrice(111)
    if (this.isLogin && this.user === 'friend') {
      self.dropsService.friendCutPrice(self.cutid).then((res) => {
        const tmpcut  = res.cutAmount
        this.cutamount = tmpcut
        this.percentage = Math.ceil((this.salePrice - this.currentPrice - tmpcut ) / (this.salePrice - this.lowestPrice) * 100) + '%';
        this.iconpercentage = Math.ceil(((this.salePrice - this.currentPrice - tmpcut) / (this.salePrice - this.lowestPrice)  * 100) - 4) + '%';
        this.friendCuts = res.friendCuts
        this.openCutPrice(res.cutAmount)
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
    let dialogRef = this.dialog.open(CutPriceDialogComponent, {
      data: {
        price
      }
    });

    let self = this;
  }
  openFaq(price) {
    let dialogRef = this.dialog.open(FaqDialogComponent, {
      data: {}
    });

    let self = this;

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  downApp() {
    window.open('https://www.getpricedrop.com')
  }



    ngOnDestroy(){
    // if(this.googleLoginSub) {
    //   this.googleLoginSub.unsubscribe();
    // }
    // if(this.facebookLoginSub) {
    //   this.facebookLoginSub.unsubscribe();
    // }
    // if(this.sub) {
    //   this.sub.unsubscribe();
    // }
  }

  private load() {
    if(this.loadingValue < 90) {
      this.loadingValue++;
    } else {
      return;
    }

    requestAnimationFrame(() => this.load());

  }
}
