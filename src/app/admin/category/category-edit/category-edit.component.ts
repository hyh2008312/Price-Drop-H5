import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { Router, NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { CategoryService } from '../category.service';

import { saveAs } from 'file-saver';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['../_category.scss']
})

export class CategoryEditComponent implements OnInit {

  category: any = {
    name: ''
  };

  categoryList: any = false;

  // MatPaginator Inputs
  length:number = 0;
  pageSize = 50;
  pageSizeOptions = [50];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.getCategoryDetail();
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

  addCategory() {
    let categoryType = 'third_Category';
    let parentId = this.activatedRoute.snapshot.params['id'];
    let dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      data: {
        parentId,
        categoryType,
        isCategoryAdd: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isCategoryAdd == true) {
        this.getFiliterCategoryList();
      }
    });
  }

  getCategoryDetail() {
    let id = this.activatedRoute.snapshot.params['id'];
    this.categoryService.getCategoryDetail({
      id
    }).then((data) => {
      this.category = data;
    });
  }

  getFiliterCategoryList() {
    let category_type = 'third_Category';
    const self = this;
    let parent_id = this.activatedRoute.snapshot.params['id'];
    this.categoryService.getFirstCategoryList({
      category_type,
      show: false,
      parent_id
    }).then((data) => {
      self.categoryList = [...data];
    });
  }

  productChange(event) {
    switch(event.status) {
      case 2:
        switch(event.event) {
          case 'delete':
            this.categoryList.splice(event.index, 1);
            break;
        }
        break;
    }
  }

}
