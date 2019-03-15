import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { GoodsDetailService } from '../goods-detail.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-recommend-goods',
  templateUrl: './recommend-goods.component.html',
  styleUrls: ['../_goods-detail.scss']
})

export class RecommendGoodsComponent implements OnInit {

  banner: any = [];
  @Input() goodsList: any = [];
  returnStu = true
  constructor(
    private router: Router,
    private goodsDetailService: GoodsDetailService
  ) {}

  ngOnInit():void {
  }
  tranArr (data: any = []) {
    let tmpArr = [];
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      tmpArr.push(item);
      if ((i > 0 && i % 2 === 1) || i === data.length - 1) {
        arr.push(tmpArr);
        tmpArr = [];
      }
    }
    return arr
  }
  countOff (s, o) {
    if (o > 0) {
      return Math.ceil((o - s) / o * 100) + '%'
    } else {
      return ''
    }
  }

}

