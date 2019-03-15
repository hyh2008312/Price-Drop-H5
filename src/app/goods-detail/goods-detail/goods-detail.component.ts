import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoodsDetailService } from '../goods-detail.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-goods-detail',
  templateUrl: './goods-detail.component.html',
  styleUrls: ['../_goods-detail.scss']
})

export class GoodsDetailComponent implements OnInit {

  banner: any = [];
  goods: any = {};
  recommendGoods: any = {};
  ahour: any = 11;
  amin: any = 12;
  asecond: any = 13;

  constructor(
    private router: Router,
    private goodsDetailService: GoodsDetailService
  ) {}

  ngOnInit():void {
    this.getGoodsDetail();
    this.getRecommendGoods();
  }

  getGoodsDetail() {
    let id = 9999
    this.goodsDetailService.getGoodsDetail(id).then((res) => {
      this.banner = res.images
      this.goods = res
      console.log(res)
    });
  }
  getRecommendGoods() {
    let id = 9999
    this.goodsDetailService.getRecommendGoods(id).then((res) => {
      this.recommendGoods = res
      console.log(res)
    });
  }
  getNowDay1 (str) {
    if (str) {
      const date = new Date().valueOf();
      const tmp = (date + ((24 * 60 * 60 * 1000) * (7 + str)))
      return tmp ;
    }
  }
  countPoints (p, a, b) {
    return (Math.floor(parseInt(p) / a)) * b;
  }
  calc (a, b) {
    return ((a * b) / 100).toFixed(2)
  }
}

