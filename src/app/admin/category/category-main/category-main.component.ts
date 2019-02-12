import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { Router, NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { CategoryService } from '../category.service';
import { UserService } from  '../../../shared/services/user/user.service';

import { saveAs } from 'file-saver';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-category-main',
  templateUrl: './category-main.component.html',
  styleUrls: ['../_category.scss']
})

export class CategoryMainComponent implements OnInit {

  category: any = [];

  categoryList: any = false;
  categoryListIndex: any = 1;

  filterCategoryList: any = [];
  subCategoryList: any = false;
  subCategoryListIndex: any = 1;

  parentId: any = false;

  selectedIndex = 0;

  // MatPaginator Inputs
  length:number = 0;
  pageSize = 50;
  pageSizeOptions = [50];

  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.changeProducts({
      index: this.selectedIndex
    });
    this.getFiliterCategoryList();
  }

  ngOnInit():void {
  }

  ngOnDestroy() {

  }

  // MatPaginator Output
  changePage(event, type) {
    this.pageSize = event.pageSize;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  changeProducts(event) {
    let category_type = 'first_Category';
    let page = this.categoryListIndex;
    let parent_id = null;
    switch (event.index) {
      case 1:
        category_type = 'second_Category';
        page = this.subCategoryListIndex;
        parent_id = this.parentId;
        if(!parent_id) {
          return
        }
        break;
      default:
        break;
    }

    const self = this;
    this.categoryService.getCategoryList({
      category_type,
      page,
      page_size: this.pageSize,
      parent_id
    }).then((data) => {
      self.length = data.count;
      switch (event.index) {
        case 0:
          self.categoryList = [...data.results];
          self.filterCategoryList = [...data.results];
          break;
        case 1:
          self.subCategoryList = [...data.results];
          break;
        default:
          break;
      }
    });

  }

  addCategory() {
    let categoryType = this.selectedIndex == 0? 'first_Category': 'second_Category';
    let parentId = this.selectedIndex == 0? null: this.parentId;
    let dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      data: {
        parentId,
        categoryType,
        isCategoryAdd: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isCategoryAdd == true) {
        this.changeProducts({index: this.selectedIndex});
      }
    });
  }


  productChange(event) {
    switch(event.status) {
      case 0:
        switch(event.event) {
          case 'edit':
            this.getFiliterCategoryList();
            break;
          case 'delete':
            this.categoryList.splice(event.index, 1);
            break;
        }
        break;
      case 1:
        switch(event.event) {
          case 'delete':
            this.subCategoryList.splice(event.index, 1);
            break;
        }
        break;
    }
  }

  getFiliterCategoryList() {
    let category_type = 'first_Category';
    const self = this;
    this.categoryService.getFirstCategoryList({
      category_type,
      show: true
    }).then((data) => {
       self.filterCategoryList = [...data];
    });
  }

  filterChange($event) {
    this.parentId = $event;
    this.changeProducts({
      index: this.selectedIndex
    });
  }

}
