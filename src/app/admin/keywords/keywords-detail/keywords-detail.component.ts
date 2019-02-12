import {Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import {Router, NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import {KeywordsService} from "../keywords.service";

@Component({
  selector: 'app-admin-keywords-detail',
  templateUrl: './keywords-detail.component.html',
  styleUrls: ['../_keywords.scss']
})

export class KeywordsDetailComponent implements OnInit {

  keywords: any = '';

  keywordsListIndex = 1;
  keywordsList: any;

  // MatPaginator Inputs
  length:number = 0;
  pageSize = 100;
  pageSizeOptions = [100];

  // MatPaginator Output
  changePage(event) {
    this.pageSize = event.pageSize;
    this.keywordsListIndex = event.pageIndex + 1;
    this.changeLists();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  constructor(private router: Router,
              private accountService: KeywordsService,
              private activatedRoute: ActivatedRoute) {
    this.changeLists();
  }

  ngOnInit(): void {

  }

  changeLists() {
    let page = this.keywordsListIndex;

    const id = this.activatedRoute.snapshot.params['id'];

    this.accountService.getKeywordsRecordList({
      id,
      page,
      page_size: this.pageSize
    }).then((data) => {
      if(page == 1) {
        this.keywords = data.results[0].keyword;
      }
      this.length = data.count;
      this.keywordsList = [...data.results];
    })
  }
}
