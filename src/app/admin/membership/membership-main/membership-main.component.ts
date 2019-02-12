import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { MembershipService } from '../membership.service';
import { UserService } from  '../../../shared/services/user/user.service';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-membership-main',
  templateUrl: './membership-main.component.html',
  styleUrls: ['../_membership.scss']
})

export class MembershipMainComponent implements OnInit {


  prize: any;

  promoteAll: any;

  selectedIndex = 0;
  prizeIndex: 1;
  campaignIndex: 1;

  // MatPaginator Inputs
  length:number = 0;
  pageSize = 50;
  pageSizeOptions = [50];

  subscription: any;

  constructor(
    private lotteryService: MembershipService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit():void {
    let self = this;
    this.subscription = this.activatedRoute.queryParams.subscribe((data) => {
      switch(data.tab) {
        case 'campaign':
          self.selectedIndex = 0;
          break;
        case 'prize':
          self.selectedIndex = 1;
          break;
        default:
          self.selectedIndex = 0;
          break;
      }

      self.changeProducts({
        index: self.selectedIndex
      });
    });
  }

  ngOnDestroy() {

  }

  // MatPaginator Output
  changePage(event, type) {
    this.pageSize = event.pageSize;
    switch (type) {
      case 1:
        this.prizeIndex = event.pageIndex + 1;
        break;
      case 0:
        this.campaignIndex = event.pageIndex + 1;
        break;
    }
    this.changeProducts({index: type});
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  changeProducts(event) {
    let page = 0;
    switch (event.index) {
      case 1:
        page = this.prizeIndex;
        this.lotteryService.getPrizeList({
          page,
          page_size: this.pageSize
        }).then((data) => {
          this.length = data.count;
          this.prize = [...data.results];
        });
        break;
      case 0:
        page = this.campaignIndex;
        this.lotteryService.getCampaignList({
          page,
          page_size: this.pageSize
        }).then((data) => {
          this.length = data.count;
          this.promoteAll = [...data.results];
        });
        break;
      default:
        break;
    }

  }

  productChange($event) {
    if($event.event == 'delete') {
      this.prize.splice($event.index,1);
    }
  }

  promotionChange($event) {
    if($event.event == 'delete') {
      this.promoteAll.splice($event.index,1);
    }
  }

}
