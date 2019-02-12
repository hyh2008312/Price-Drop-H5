import {Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import {AdminService} from '../../admin.service';
import {UserService} from '../../../shared/services/user/user.service';
import {CustomerService} from "../customer.service";

@Component({
  selector: 'app-customer-service-main',
  templateUrl: './customer-service-main.component.html',
  styleUrls: ['../_customer-service.scss']
})

export class CustomerServiceMainComponent implements OnInit {


  messageAwaitingList: any = [];
  messageAwaitingPage = 1;

  messageRespondedList: any = [];
  messageRespondedPage = 1;

  messageClosedList: any = [];
  messageClosedPage = 1;

  selectedIndex: number = 0;
  subscription: any;

  searchKey: any = '';
  isSearch: boolean = false;
  searchForm: FormGroup;

  // MatPaginator Inputs
  length: number = 0;
  pageSize = 12;
  pageSizeOptions = [6, 12];


  constructor(private router: Router,
              private customerService: CustomerService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {

    this.searchForm = this.fb.group({
      searchKey: ['']
    });

    this.searchForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.changeProducts({
      index: this.selectedIndex
    });
  }

  onValueChanged(data) {
    this.isSearch = false;
  }

  clearSearchKey() {
    this.searchKey = '';
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {

  }

  // MatPaginator Output
  changePage(event, type) {
    this.pageSize = event.pageSize;
    switch (type) {
      case 0:
        this.messageAwaitingPage = event.pageIndex + 1;
        break;
      case 1:
        this.messageRespondedPage = event.pageIndex + 1;
        break;
      case 2:
        this.messageClosedPage = event.pageIndex + 1;
        break;
      default:
        break;
    }
    this.changeProducts({index: type});
  }

  changeProducts(event) {
    let relationStatus = 'Awaiting Response';
    let page = this.messageAwaitingPage;
    switch (event.index) {
      case 1:
        relationStatus = 'Responded';
        page = this.messageRespondedPage;
        break;
      case 2:
        relationStatus = 'Closed';
        page = this.messageClosedPage;
        break;
      default:
        break;
    }

    let self = this;

    this.customerService.getMessageList({
      status: relationStatus,
      page: page,
      page_size: this.pageSize,
    }).then((data) => {
      self.length = data.count;
      switch (event.index) {
        case 1:
          self.messageRespondedList = data.results;
          break;
        case 2:
          self.messageClosedList = data.results;
          break;
        default:
          self.messageAwaitingList = data.results;
          break;
      }
    });
  }
}
