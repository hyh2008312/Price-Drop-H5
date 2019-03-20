import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['../_order.scss']
})

export class CityListComponent implements OnInit {

  @Input() flashSaleList: any = [];
  @Input() flashSaleTime: any;
  ahour: any = 11;
  amin: any = 12;
  asecond: any = 13;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.addNavigation('Edit Address');

  }
  countOff (s, o) {
    if (o > 0) {
      return Math.ceil((o - s) / o * 100) + '%'
    } else {
      return ''
    }
  }
}
