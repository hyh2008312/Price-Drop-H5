import {Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import {AdminService} from '../../admin.service';
import {UserService} from '../../../shared/services/user/user.service';
import {AccountService} from "../account.service";

@Component({
  selector: 'app-account-item-main',
  templateUrl: './account-main.component.html',
  styleUrls: ['../_account.scss']
})

export class AccountMainComponent implements OnInit {

  overViewListCategory: any = ['Yesterday', 'Last 7 days', 'Last 14 days', 'Last 30 days', 'All Time'];
  overViewCategory: string = 'Yesterday';

  topProductListCategory: any = ['Yesterday', 'Last 7 days', 'Last 14 days', 'Last 30 days', 'All Time'];
  topProductCategory: string = 'Yesterday';

  topProductSortListCategory: any = ['Total Earnings', 'Total Orders', 'Total Sales', 'Total Pageviews', 'Total Visitors', 'Conversion Rate'];
  topProductSortCategory: string = 'Total Earnings';


  // MatPaginator Inputs
  length: number = 32;
  pageSize = 12;
  pageSizeOptions = [6, 12];


  textList: any = [1, 2, 3, 4, 5];


  showTwo: boolean = false;
  showSeven: boolean = false;
  showEight: boolean = false;


  constructor(private router: Router,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {

  }

  ngOnInit(): void {

  }

  changeTwo(flag: boolean) {
    this.showTwo = flag;
  }

  changeSeven(flag: boolean) {
    this.showSeven = flag;
  }

  changeEight(flag: boolean) {
    this.showEight = flag;
  }
}
