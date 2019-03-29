import {Component, OnInit, ChangeDetectorRef, NgZone, OnDestroy, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { DropsService } from '../drops.service';
import { UserService } from '../../shared/services/user/user.service';
import { GuardLinkService } from '../../shared/services/guard-link/guard-link.service';

import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import {CutPriceDialogComponent} from '../cut-price-dialog/cut-price-dialog.component';



@Component({
  selector: 'app-drops-detail',
  templateUrl: './user-share.component.html',
  styleUrls: ['./_user-share.scss'],
  entryComponents: [CutPriceDialogComponent]
})

export class UserShareComponent implements OnInit, OnDestroy {

  loadingValue: any = 0;
  color = 'Accent';

  cutid: any;
  imgsrc: any;
  someGoodsList: any;
  percentage: any;
  ahour: any;
  amin: any;
  asecond: any;
  title: any;
  currentPrice: any;
  priceOff: any;
  user: any= {
    id: ''
  };
  isMe: any;
  errMsg: any = '';
  cutAmount: any;
  isLogin = false;
  cutPriceStauts : any = false;
  dropObj: any = {
    friendsDrop: [],
    dropStatus: '',
    user: '',
    canDrop: '',
  };
  timer: any;
  addHeight: any = true;

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
  ) {

    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });

    this.userService.addNavigation(false);

    this.auth.isOnlyAuthorized().subscribe((data) => {
      if (data) {
        this.isLogin = true;
        this.userService.currentUser.subscribe((data) => {
          if(data){
            this.user = data;
            this.getADropDetail();
          }
        })
      } else {
        this.getDropDetail();

      }
    });
    this.getSomeGoods();
  }
  ngOnInit(): void {

  }
  openFaq(event) {}
  getDropDetail() {
    const self = this;
    self.cutid = self.activatedRoute.snapshot.params['cutId'];
    // self.cutid = 86;
    self.dropsService.getDropDetail(self.cutid, this.isLogin).then((res) => {
        if (res === undefined) {
          return
        }
        const data = {
          description: 'Click Help, no purchase needed!',
          title: 'Help me drop the price & Earn up to Rs.50!',
          shareImage: res.mainImage,
        };
        this.dropsService.addTitleDescription(data);
        this.dropObj = res;
        this.imgsrc = res.avatar;
        this.priceOff =  Math.ceil((parseInt(res.saleUnitPrice) - parseInt(res.currentPrice)) / parseInt(res.saleUnitPrice) * 100) + '% OFF'
        this.percentage = Math.ceil(((5 - res.friendsDrop.length) / 5 ) * 100 ) + '%';
        // this.percentage = '20%';
        if (this.dropObj.dropStatus === 'progressing') {
          this.editTime(this.dropObj.endTime);
        } else {
          this.editTime(this.dropObj.cancelTime);
        }
        // console.log(res)
      })
  }
  getADropDetail() {
    const self = this;
    self.cutid = self.activatedRoute.snapshot.params['cutId'];
    // self.cutid = 86;
      self.dropsService.getADropDetail(self.cutid, this.isLogin, this.user.id).then((res) => {
        if (res === undefined) {
          return
        }
        const data = {
          description: 'Click Help, no purchase needed!',
          title: 'Help me drop the price & Earn up to Rs.50!',
          shareImage: res.mainImage,
        };
        this.dropsService.addTitleDescription(data);
        this.dropObj = res;
        this.imgsrc = res.avatar;
        this.priceOff =  Math.ceil((parseInt(res.saleUnitPrice) - parseInt(res.currentPrice)) / parseInt(res.saleUnitPrice) * 100) + '% OFF'
        this.percentage = Math.ceil(((5 - res.friendsDrop.length) / 5 ) * 100 ) + '%';
        // this.percentage = '20%';
        if (this.dropObj.dropStatus === 'progressing') {
          this.editTime(this.dropObj.endTime);
        } else {
          this.editTime(this.dropObj.cancelTime);
        }
        // console.log(res)
      })
  }

  cutPrice() {
    this.cutid = this.activatedRoute.snapshot.params['cutId'];
    if (this.isLogin) {
      if (this.dropObj.user === 'friend') {
        this.isMe = false;
        if(this.dropObj.dropStatus ==='progressing'&& this.dropObj.canDrop){
          this.dropsService.friendCutPrice(this.cutid).then((res) => {
            if (res) {
              this.dropObj = res;
              this.priceOff = Math.ceil((parseInt(res.saleUnitPrice) - parseInt(res.currentPrice)) / parseInt(res.saleUnitPrice) * 100) + '% OFF';
              this.percentage = Math.ceil(((5 - res.friendsDrop.length) / 5 ) * 100 ) + '%';
              this.cutAmount =  res.rewardBonus;
              this.openCutPrice(Event, true);
            } else {
              this.openCutPrice(Event, true);
            }
          }).catch((res) => {
            this.openCutPrice(Event, true);
            this.errMsg = res;
          })
        } else {
          this.openCutPrice(Event, true);
        }
      } else {
        this.isMe = true
      }
    } else  {

      if (!this.isLogin) {
        this.guardLinkService.addRouterLink(window.location.pathname);
        this.router.navigate(['/account/login' ]);
        return
      }
    }

  }
  getSomeGoods() {
    const self = this
    self.cutid = self.activatedRoute.snapshot.params['cutId'];
    // self.cutid = 86;
    self.dropsService.getSomeGoods().then((res) => {
      if (res === undefined) {
        return
      }
      this.someGoodsList = [...res];
    });
  }
  openCutPrice($event,a?:any) {
    this.cutPriceStauts = !this.cutPriceStauts
  }
  editTime(time) {
    // const tmp = 1527753479
    const self = this;
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
          self.asecond = '0' + self.asecond;
        }

        // 加上减掉的天数
        self.ahour += (day * 24);
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
  openDeepLink() {
    window.open(this.dropObj.dropLink);
  }
  downApp(i) {
    window.open(i.shareUrl);
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
