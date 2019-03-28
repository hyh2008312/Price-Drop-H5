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
  activeState: any = '';
  addHeight: any = true;
  ahour: any = 11;
  amin: any = 12;
  asecond: any = 13;


  constructor(
    private router: Router,
    private orderListService: OrderListService,
    private userService: UserService
  ) {
    this.orderListService.defaultState.subscribe((data) => {
      if (data) {
        this.activeState = data;
      }
    });
    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
  }

  ngOnInit(): void {
    this.userService.addNavigation('Edit Address');
    this.getCityList();

  }
  getCityList () {
    this.orderListService.getCityList().then((res) => {
      this.activeState = res[0]
      this.citySort(res);
    }).catch((res) => {
      console.log(res);
    });
  }
  seletCity(item) {
    this.activeState = item;
  }
  saveCity() {
    // this.orderListService.addState(this.activeState);
    this.router.navigate(['/order/changeAddress'], {queryParams: {id: this.activeState.id, name: this.activeState.name}});
  }
  citySort (arr) {
    const tmp = [];
    const resultArr = [];
    for (const item of arr) {
      if (tmp.toString().indexOf(item.name.substring(0 , 1)) === -1) { // 去重
        tmp.push(item.name.substring(0 , 1));
      }
    }
    for (const item of tmp) {
      resultArr.push({
        fWord: item,
        city: []
      });
    }
    for (const i of arr) {
      for (const j of resultArr) {
        if (i.name.substring(0, 1) === j.fWord) {
          j.city.push({
            name: i.name, code: i.code, id: i.id
          });
        }
      }
    }
    this.city = resultArr;
  }
}
