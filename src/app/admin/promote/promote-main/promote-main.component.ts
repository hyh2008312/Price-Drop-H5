import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { PromoteService } from '../promote.service';
import { UserService } from  '../../../shared/services/user/user.service';

@Component({
  selector: 'app-promote-promote-main',
  templateUrl: './promote-main.component.html',
  styleUrls: ['../_promote.scss']
})

export class PromoteMainComponent implements OnInit {


  promoteAll: any = false;
  promoteAllIndex = 1;
  promoteScheduled: any = false;
  promoteScheduledIndex = 1;
  promoteOngoing: any = false;
  promoteOngoingIndex = 1;
  promoteEnded: any = false;
  promoteEndedIndex = 1;

  selectedIndex: number = 0;
  subscription: any;

  // MatPaginator Inputs
  length:number = 0;
  pageSize = 12;
  pageSizeOptions = [6, 12];

  constructor(
    private promoteService: PromoteService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit():void {
    let self = this;
    this.subscription = this.activatedRoute.queryParams.subscribe((data) => {
      switch(data.tab) {
        case 'all':
          self.selectedIndex = 0;
          break;
        case 'scheduled':
          self.selectedIndex = 1;
          break;
        case 'ongoing':
          self.selectedIndex = 2;
          break;
        case 'ended':
          self.selectedIndex = 3;
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
    this.subscription.unsubscribe();
  }

  // MatPaginator Output
  changePage(event, type) {
    this.pageSize = event.pageSize;
    switch (type) {
      case 0:
        this.promoteAllIndex = event.pageIndex + 1;
        break;
      case 1:
        this.promoteScheduledIndex = event.pageIndex + 1;
        break;
      case 2:
        this.promoteOngoingIndex = event.pageIndex + 1;
        break;
      case 3:
        this.promoteEndedIndex = event.pageIndex + 1;
        break;
      default:
        break;
    }
    this.changeProducts({index: type});
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }


  changeProducts(event) {
    let status = null;
    let page = this.promoteAllIndex;
    switch (event.index) {
      case 1:
        status = 'Scheduled';
        page = this.promoteScheduledIndex;
        break;
      case 2:
        status = 'Ongoing';
        page = this.promoteOngoingIndex;
        break;
      case 3:
        status = 'Ended';
        page = this.promoteEndedIndex;
        break;
      default:
        break;
    }

    let self = this;

    this.promoteService.getPromotionList({
      status: status,
      page: page,
      page_size: this.pageSize
    }).then((data) => {
      self.length = data.count;
      switch (event.index) {
        case 1:
          self.promoteScheduled = data.results;
          break;
        case 2:
          self.promoteOngoing = data.results;
          break;
        case 3:
          self.promoteEnded = data.results;
          break;
        default:
          self.promoteAll = data.results;
          break;
      }

    });

  }

  promotionChange(event) {
    switch(event.status) {
      case 0:
        switch(event.event) {
          case 'delete':
            this.promoteAll.splice(event.index,1);
            break;
        }
        break;
      case 1:
        switch(event.event) {
          case 'delete':
            this.promoteScheduled.splice(event.index,1);
            break;
        }
        break;
      case 2:
        switch(event.event) {
          case 'delete':
            this.promoteOngoing.splice(event.index,1);
            break;
        }
        break;
    }
  }

}
