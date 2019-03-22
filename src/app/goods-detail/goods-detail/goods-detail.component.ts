import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { GoodsDetailService } from '../goods-detail.service';
import { GoodsVariantDialogComponent } from '../variant-dialog/goods-variant-dialog.component';

@Component({
  selector: 'app-goods-detail',
  templateUrl: './goods-detail.component.html',
  styleUrls: ['../_goods-detail.scss']
})

export class GoodsDetailComponent implements OnInit {

  banner: any = [];
  goods: any = {};
  recommendGoods: any = {};
  variantStatus: any = false;
  ahour: any = 11;
  amin: any = 12;
  asecond: any = 13;

  constructor(
    private router: Router,
    private goodsDetailService: GoodsDetailService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit():void {
    this.getGoodsDetail();
    this.getRecommendGoods();
  }

  getGoodsDetail() {
    let id = 14823
    this.goodsDetailService.getGoodsDetail(id).then((res) => {
      this.banner = res.images
      this.goods = res
      // console.log(res)
    });
  }
  getRecommendGoods() {
    let id = this.activatedRoute.snapshot.params['id'];
    this.goodsDetailService.getRecommendGoods(id).then((res) => {
      this.recommendGoods = res
      // console.log(res)
    });
  }
  getNowDay1 (str) {
    if (str) {
      const date = new Date().valueOf();
      const tmp = (date + ((24 * 60 * 60 * 1000) * (7 + str)))
      return tmp ;
    }
  }
  openVariant($event,a?:any) {
    let dialogRef = this.dialog.open(GoodsVariantDialogComponent, {
      data: {
        goods: this.goods
      },
      position: {
        bottom: '0',
        left: '0'
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
  countPoints (p, a, b) {
    return (Math.floor(parseInt(p) / a)) * b;
  }
  calc (a, b) {
    return ((a * b) / 100).toFixed(2)
  }
}

