import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['../_category.scss']
})

export class AddCategoryDialogComponent implements OnInit {

  categoryForm : FormGroup;
  error: any = false;
  image: any = false;

  categoryList: any = false;
  subCategoryList: any = false;
  thirdCategoryList: any = false;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      name: [''],
      index: [1, Validators.required],
      categoryType: ['', Validators.required],
      parentId: [null],
      show: [true],
      grandParent: [],
      parent: [],
      child: [],
      categoryId: []
    });

    this.categoryForm.patchValue({
      categoryType: this.data.categoryType,
      parentId: this.data.parentId
    });

    if(this.data.categoryType == 'third_Category') {
      this.getCategory();
    }

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  create() {
    if(this.categoryForm.invalid) {
      return;
    }

    let self = this;
    let params = this.categoryForm.value;
    params.image = this.image;
    this.categoryService.categoryCreate(this.categoryForm.value).then((data) => {
      if(data.id) {
        self.close();
        self.data.isCategoryAdd = true;
      } else {
        self.error = 'Duplicate Category!';
      }
    }).catch(() => {
      self.error = 'Duplicate Category!';
    });
  }

  getCategory() {
    this.categoryService.getBaseCategoryList().then((value) => {
      this.categoryList = [...value];
    });
  }

  categoryChange($event) {
    if(this.categoryList.length > 0) {
      let index = this.categoryList.findIndex((data) => {
        if(data.id == $event.id) {
          return true;
        }
      });
      if(this.categoryList[index] && this.categoryList[index].children) {
        this.subCategoryList = [...this.categoryList[index].children];
        this.thirdCategoryList = [];
        this.categoryForm.patchValue({
          parent: null,
          child: null
        });
      } else {
        this.subCategoryList = false;
        this.thirdCategoryList = false;
        this.categoryForm.patchValue({
          parent: null,
          child: null
        });
      }

    }
    this.categoryForm.patchValue({
      name: $event.data.name,
      categoryId: $event.id
    });
  }

  subCategoryChange($event) {
    if(this.subCategoryList.length > 0) {
      let index = this.subCategoryList.findIndex((data) => {
        if(data.id == $event.id) {
          return true;
        }
      });
      if(this.subCategoryList[index] && this.subCategoryList[index].children) {
        this.thirdCategoryList = [...this.subCategoryList[index].children];
        this.categoryForm.patchValue({
          child: null
        });
      } else {
        this.thirdCategoryList = false;
        this.categoryForm.patchValue({
          parent: null,
          child: null
        });
      }
    }
    this.categoryForm.patchValue({
      name: $event.data.name,
      categoryId: $event.id
    });
  }

  thirdCategoryChange($event) {
    this.categoryForm.patchValue({
      name: $event.data.name,
      categoryId: $event.id
    });
  }

}
