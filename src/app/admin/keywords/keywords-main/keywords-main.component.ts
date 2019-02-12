import {Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import {Router, NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import {KeywordsService} from "../keywords.service";
import {AddHotwordDialogComponent} from "../add-hotword-dialog/add-hotword-dialog.component";
import {MatDialog} from '@angular/material';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-admin-keywords-main',
  templateUrl: './keywords-main.component.html',
  styleUrls: ['../_keywords.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'en'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})

export class KeywordsMainComponent implements OnInit {

  csAll: any;
  ceAll: any;
  startDate: any;
  endDate: any;
  isLoading: boolean = false;
  color: any = 'accent';
  mode: any = 'indeterminate';
  value: any = 20;

  selectedIndex: any = 0;

  keywordsListIndex = 1;
  keywordsList: any;
  hotwordList: any;

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
              private dialog: MatDialog) {
    this.changeLists();
  }

  ngOnInit(): void {

  }

  changeLists($event?: any) {
    let page: any = '';
    switch (this.selectedIndex) {
      case 0:
        this.accountService.getHotwordList().then((data) => {
          this.hotwordList = [...data];
        });
        break;
      case 1:
        page = this.keywordsListIndex;
        let start_time = this.csAll? this.csAll: null;
        let end_time = this.ceAll? this.ceAll: null;

        this.accountService.getKeywordsList({
          start_time,
          end_time,
          page,
          page_size: this.pageSize
        }).then((data) => {
          this.length = data.count;
          this.keywordsList = [...data.results];
        });
        break;
    }
  }

  createHotword() {
    let dialogRef = this.dialog.open(AddHotwordDialogComponent, {
      data: {
        isHotwordEdit: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isHotwordEdit == true) {
        this.changeLists();
      }
    });
  }

  cancel() {
    this.csAll = null;
    this.ceAll = null;
    this.startDate = null;
    this.endDate = null;
    this.changeLists();
  }

  filterDate() {
    this.changeLists();
    // this.isLoading = true;
    // let start_time = this.csAll;
    // let end_time = this.ceAll;
    //
    // let page = this.keywordsListIndex;
    //
    // this.accountService.getNewKeywordsList({
    //   start_time,
    //   end_time,
    //   page,
    //   page_size: this.pageSize
    // }).then((data) => {
    //   let keywords: any = {};
    //   for(let item of data) {
    //     if(!keywords[item['keyword']]) {
    //       keywords[item['keyword']] = {
    //         id: item['keyId'],
    //         keyWords: item['keyword'],
    //         count: 1,
    //         created: item['created']
    //       }
    //     } else {
    //       keywords[item['keyword']].count++;
    //     }
    //
    //   }
    //   this.keywordsList = [];
    //   for(let itm in keywords) {
    //     this.keywordsList.push(keywords[itm]);
    //   }
    //   this.keywordsList.sort((a, b) => {
    //     if(new Date(a.created).getTime() < new Date(a.created).getTime()) {
    //       return 1;
    //     } else if(new Date(a.created).getTime() > new Date(b.created).getTime()) {
    //       return -1;
    //     }
    //     return 0;
    //   }).sort((a, b) => {
    //     if(a.count < b.count) {
    //       return 1;
    //     } else if(a.count > b.count) {
    //       return -1;
    //     }
    //     return 0;
    //   });
    //
    //   this.length = this.keywordsList.length;
    //   this.isLoading = false;
    // });
  }

  addEvent(type: any, event:MatDatepickerInputEvent<any>) {
    this[type] = event.value._i.year + '-'+ (event.value._i.month+1) +'-'+event.value._i.date + ' 00:00:00';
  }

  userChange($event) {
    switch ($event.status) {
      case 0:
        switch ($event.event) {
          case 'delete':
            this.hotwordList.splice($event.index, 1);
            break;
          case 'edit':
            this.changeLists();
            break;
        }
        break;
      case 1:
        break;
    }
  }
}
