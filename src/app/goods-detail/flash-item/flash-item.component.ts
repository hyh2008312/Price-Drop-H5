import {Component, OnInit, Input, ChangeDetectorRef, NgZone} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-flash-item',
  templateUrl: './flash-item.component.html',
  styleUrls: ['./_flash-item.scss']
})

export class FlashItemComponent implements OnInit {

// :fstatus="flashSale.flashStatus"
// :saleUnitPrice="goods.price"
// :unitPrice="goods.unitPrice"
// :discount="flashSale.discount"
  @Input() flashSale: any = {};
  @Input() saleUnitPrice: any = '';
  @Input() unitPrice: any = '';
  ahour: any= '00';
  amin: any= '00';
  asecond: any = '00';
  productId: any= '';
  goods: any = {};
  addHeight = true;
  timer: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {
  }

  ngOnInit(): void {
    if (this.flashSale.flashStatus === 'Ongoing') {
      this.editTime(this.flashSale.endTime);
    } else {
      this.editTime(this.flashSale.startTime);
    }
  }
  calc (a, b) {
    return parseInt(((a * b) / 100).toString());
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
          self.amin = '0' + self.amin;
        }
        const afterMin = total - day * 24 * 60 * 60 - self.ahour * 60 * 60 - self.amin * 60;

        self.asecond = Math.floor(afterMin);//秒
        if ( self.asecond < 10) {
          self.asecond = '0' + self.asecond;
        }

        // 加上减掉的天数
        self.ahour += (day * 24);
        if (self.ahour < 10) {
          self.ahour = '0' + self.ahour;
        }
        if ((self.ahour.toString()).indexOf('-') > 0) {
          this.ahour= '00';
          this.amin= '00';
          this.asecond= '00';
        }
        if (!self.changeDetectorRef['destroyed']) {
          self.changeDetectorRef.detectChanges();
        }
      }, 1000);
    });
    // alert(time / (24 * 3600 * 1000))
  }
}

