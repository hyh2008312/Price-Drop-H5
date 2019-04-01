import { Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { GoodsDetailService } from '../goods-detail.service';
import {UserService} from '../../shared/services/user/user.service';

@Component({
  selector: 'app-goods-description',
  templateUrl: './goods-description.component.html',
  styleUrls: ['../_goods-detail.scss']
})

export class GoodsDescriptionComponent implements OnInit {

  banner: any = [];
  productId: any= '';
  goods: any = {};
  addHeight = true;
  returnStu = true;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private goodsDetailService: GoodsDetailService
  ) {
    this.userService.addNavigation('Description');

    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
  }

  ngOnInit():void {

    this.productId = this.activatedRoute.snapshot.params['id'];
    if(this.productId){
      this.getGoodsDetail();
    }

  }
  getGoodsDetail() {
    this.goodsDetailService.getGoodsDetail(this.productId).then((res) => {
      this.goods = res;
    }).catch((res) => {
      console.log(res);
    });
  }

  trimNullObj (arr: any = []) {
    const tmpArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].content != '') {
        tmpArr.push(arr[i]);
      }
    }
    return tmpArr;
  }
  turnreturnStu () {
    this.returnStu = !this.returnStu;
  }
  calc (a, b) {
    return ((a * b) / 100).toFixed(2);
  }
}

