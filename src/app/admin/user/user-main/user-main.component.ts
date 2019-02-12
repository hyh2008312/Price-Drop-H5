import {Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import {AdminService} from '../../admin.service';
import {UserService} from '../../../shared/services/user/user.service';
import {AccountService} from "../user.service";

@Component({
  selector: 'app-admin-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['../_user.scss']
})

export class UserMainComponent implements OnInit {


  selectedIndex: any = 0;
  userPendingIndex = 1;
  userPending: any;
  userApprovedIndex = 1;
  userApproved: any;
  userDisapprovedIndex = 1;
  userDisapproved: any;
  userSkippedIndex = 1;
  userSkipped: any;

  // MatPaginator Inputs
  length:number = 0;
  pageSize = 20;
  pageSizeOptions = [20];

  // MatPaginator Output
  changePage(event, type) {
    this.pageSize = event.pageSize;
    switch (type) {
      case 0:
        this.userPendingIndex = event.pageIndex + 1;
        break;
      case 1:
        this.userSkippedIndex = event.pageIndex + 1;
        break;
      case 2:
        this.userApprovedIndex = event.pageIndex + 1;
        break;
      case 3:
        this.userDisapprovedIndex = event.pageIndex + 1;
        break;
      default:
        break;
    }
    this.changeLists({index: type});
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  constructor(private router: Router,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute) {
    this.changeLists({index: 0});
  }

  ngOnInit(): void {

  }

  changeLists($event) {
    let status = 'Pending';
    let page = this.userPendingIndex;
    switch($event.index) {
      case 1:
        page = this.userSkippedIndex;
        status = 'Skipped';
        break;
      case 2:
        page = this.userApprovedIndex;
        status = 'Approved';
        break;
      case 3:
        page = this.userDisapprovedIndex;
        status = 'Disapproved';
        break;
    }

    this.accountService.getAccountsList({
      status,
      page,
      page_size: this.pageSize
    }).then((data) => {
      this.length = data.count;
      switch ($event.index) {
        case 1:
          this.userSkipped = [...data.results];
          break;
        case 2:
          this.userApproved = [...data.results];
          break;
        case 3:
          this.userDisapproved = [...data.results];
          break;
        default:
          this.userPending = [...data.results];
          break;
      }
    })
  }

  userChange(event) {
    switch(event.status) {
      case 0:
        switch(event.event) {
          case 'Skipped':
            this.userPending.splice(event.index,1);
            break;
          case 'Approved':
            this.userPending.splice(event.index,1);
            break;
          case 'Disapproved':
            this.userPending.splice(event.index,1);
            break;
        }
        if(this.userPending.length == 0) {
          this.userPendingIndex++;
          this.changeLists({index:0});
        }
        break;
      case 1:
        switch(event.event) {
          case 'Approved':
            this.userSkipped.splice(event.index,1);
            break;
          case 'Disapproved':
            this.userSkipped.splice(event.index,1);
            break;
        }
        if(this.userSkipped.length == 0) {
          this.userSkippedIndex++;
          this.changeLists({index:0});
        }
        break;
      case 2:
        switch(event.event) {
          case 'Skipped':
            this.userApproved.splice(event.index,1);
            break;
          case 'Disapproved':
            this.userApproved.splice(event.index,1);
            break;
        }
        if(this.userApproved.length == 0) {
          this.userApprovedIndex++;
          this.changeLists({index:0});
        }
        break;
      case 3:
        switch(event.event) {
          case 'Skipped':
            this.userDisapproved.splice(event.index,1);
            break;
          case 'Approved':
            this.userDisapproved.splice(event.index,1);
            break;
        }
        if(this.userDisapproved.length == 0) {
          this.userDisapprovedIndex++;
          this.changeLists({index:0});
        }
        break;
    }
  }
}
