import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { OrderListService } from '../order-list.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['../_order.scss']
})

export class CityListComponent implements OnInit {

  city: any = [{
    fWord: '',
    city: []
  }];
  ahour: any = 11;
  amin: any = 12;
  asecond: any = 13;

  constructor(
    private router: Router,
    private orderService: OrderListService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.addNavigation('Edit Address');
    this.getCityList()

  }
  getCityList () {
    this.orderService.getCityList().then((res) => {
      // this.city = res
      this.citySort(res)
      console.log(res)
    }).catch((res) => {
      console.log(res)
    })
  }
  citySort (arr) {
    const tmp = [];
    const resultArr = [];
    for (const item of arr) {
      if ( tmp.toString().indexOf(item.name.substring(0 , 1)) === -1 ) { // 去重
        tmp.push(item.name.substring(0 , 1))
      }
    }
    for (const item of tmp) {
      resultArr.push({
        fWord: item,
        city: []
      })
    }
    for (const i of arr) {
      for (const j of resultArr) {
        if (i.name.substring(0, 1) === j.fWord) {
          j.city.push({
            name: i.name, code: i.code
          })
        }
      }
    }
    this.city = resultArr
  }
}
