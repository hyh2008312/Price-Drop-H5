import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-sizeChart-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['../_sizeChart.scss']
})

export class PaginationComponent implements OnInit {

  @Input() pageSize: any = 1;
  @Input() page: any = 1;
  @Input() length: any = 1;
  @Output() paginationChange = new EventEmitter<any>();

  showPaginationNumber = 4;

  hasPrevious: boolean = false;
  hasNext: boolean = false;

  pageArray: any = [];

  record: number = 0;

  constructor(

  ) {


  }

  changePreviousPagination() {
    this.page--;
    if(this.page >= 1) {
      if(this.page < this.pageArray[0]) {
        this.pageArray = [];
        for(let i = this.showPaginationNumber - 1; i >= 0; i--) {
          this.pageArray.push(this.page - i);
        }
        this.hasNext = true;
      }

      if(this.page <= 1) {
        this.hasPrevious = false;
      }

      this.paginationChange.emit({
        page: this.page,
        pageSize: this.pageSize
      });
    }

  }

  changeNextPagination() {
    this.page++;
    if(this.page <= Math.ceil(this.length / this.pageSize)) {
      if(this.page > this.pageArray[this.pageArray.length - 1]) {
        if(this.showPaginationNumber < Math.ceil(this.length / this.pageSize) - this.page + 1) {
          this.pageArray = [];
          for(let i = 0; i < this.showPaginationNumber; i++) {
            this.pageArray.push(this.page + i);
          }
        } else {
          let _len = Math.ceil(this.length / this.pageSize) - this.page + 1;
          this.pageArray = [];
          for(let i = 0; i < _len; i++) {
            this.pageArray.push(this.page + i);
          }
        }
      }

      if(this.page == Math.ceil(this.length / this.pageSize)) {
        this.hasNext = false;
      }

      if(this.page > 1) {
        this.hasPrevious = true;
      }

      this.paginationChange.emit({
        page: this.page,
        pageSize: this.pageSize
      });
    }
  }

  ngOnInit(): void {

  }

  ngOnChanges() {
    if(this.record != this.length) {
      this.record = this.length;
      this.initPagination();
    }
  }

  initPagination() {
    this.page = 1;
    this.hasPrevious = false;
    this.hasNext = false;
    if(this.length / this.pageSize > 4) {
      this.pageArray = [];
      for(let i = 0; i < this.showPaginationNumber; i++) {
        this.pageArray.push(this.page + i);
      }
      this.hasNext = true;
    } else if( this.length > 0 && this.length / this.pageSize <= 4) {
      this.pageArray = [];
      for(let i = 0; i < Math.ceil(this.length / this.pageSize); i++) {
        this.pageArray.push(this.page + i);
      }
      if(this.length/this.pageSize <1) {
        this.hasNext = false;
      } else {
        this.hasNext = true;
      }
    } else if(this.length <= 0) {
      this.hasNext = false;
      this.hasPrevious = false;
      this.pageArray = [];
    }
  }


  changePagination($event) {
    this.page = $event;
    this.paginationChange.emit({
      page: this.page,
      pageSize: this.pageSize
    });

    this.hasPrevious = true;
    this.hasNext = true;

    if(this.page == 1) {
      this.hasPrevious = false;
    }

    if(this.page == Math.ceil(this.length / this.pageSize)) {
      this.hasNext = false;
    }
  }

}
