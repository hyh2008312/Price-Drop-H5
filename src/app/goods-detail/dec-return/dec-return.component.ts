import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { GoodsDetailService } from '../goods-detail.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-dec-return',
  templateUrl: './dec-return.component.html',
  styleUrls: ['../_goods-detail.scss']
})

export class DecReturnComponent implements OnInit {

  banner: any = [];
  @Input() goods: any = {};
  returnStu = true
  constructor(
    private router: Router,
    private goodsDetailService: GoodsDetailService
  ) {}

  ngOnInit():void {
  }
  openDec () {
    // console.log(111)
    // this.router.navigate([`/goodsDescription`], {queryParams: {goods: this.goods}});
  }
  trimNullObj (arr: any = []) {
    const tmpArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].content != '') {
        tmpArr.push(arr[i])
      }
    }
    return tmpArr
  }
  turnreturnStu () {
    this.returnStu = !this.returnStu
  }
  calc (a, b) {
    return ((a * b) / 100).toFixed(2)
  }
}

