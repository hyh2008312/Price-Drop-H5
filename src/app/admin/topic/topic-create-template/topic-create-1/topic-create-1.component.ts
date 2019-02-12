import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { TopicService } from '../../topic.service';

import { SelectProductDialogComponent } from  '../../select-product-dialog/select-product-dialog.component';

import { AddTabDialogComponent } from  '../../add-tab-dialog/add-tab-dialog.component';

@Component({
  selector: 'app-topic-topic-create-1',
  templateUrl: './topic-create-1.component.html',
  styleUrls: ['../../_topic.scss']
})

export class TopicCreateOneComponent implements OnInit {

  currency: string = 'USD';

  promotionForm: FormGroup;

  selectedIndex: any = 0;

  @Input() isEdit: boolean = false;
  @Input() templateId: any = 1;
  @Output() isEditChange = new EventEmitter<any>();

  campaign: any = {};

  page = 1;

  pageSize = 50;

  length = 1;

  pageSizeOptions = [50];

  promotionProducts: any = [];

  categoryList: any;

  image: any;

  subevents: any = false;

  tabName: any = '';

  constructor(
    private promoteService: TopicService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {

    this.promotionForm = this.fb.group({
      name: ['', Validators.required],
      image: [''],
      color: [''],
      templateId: [this.templateId, Validators.required]
    });
  }

  ngOnInit(): void {
    this.promoteService.getCategoryList().then((data) => {
      this.categoryList = data;
      this.categoryList.unshift({
        id: 'all',
        name: 'All'
      });
    });
  }

  continue() {
    if(this.promotionForm.invalid) {
      return;
    }

    let params = this.promotionForm.value;

    params.image = this.image;

    this.promoteService.promotionCreate(this.promotionForm.value).then((data) => {
      if(data) {
        this.isEdit = true;
        this.isEditChange.emit(this.isEdit);
        this.campaign = data;
      }
    });
  }

  selectProduct(id) {
    let dialogRef = this.dialog.open(SelectProductDialogComponent, {
      data: {
        categoryList: this.categoryList,
        promotionId: id,
        isEdit: false
      }
    });

    let self = this;

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isEdit == true) {
        self.getPromotionProductList({
          index: self.selectedIndex
        });
      }
    });
  }

  addTabName() {
    let dialogRef = this.dialog.open(AddTabDialogComponent, {
      data: {
        activityId: this.campaign.id,
        isEdit: false
      }
    });

    let self = this;

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isEdit == true) {
        this.getPromotionDetail(true);
      }
    });
  }

  changePromotionProduct(event) {
    switch(event.event) {
      case 'delete':
        this.promotionProducts.splice(event.index, 1);
        break;
      case 'changed':
        this.getPromotionProductList({
          index: this.selectedIndex
        });
        break;
    }
  }

  getPromotionProductList($event) {
    let id = this.subevents[$event.index].id;
    this.tabName = this.subevents[$event.index].name;
    this.promoteService.getSelectedPromotionProductList({
      id
    }).then((data) => {
      this.promotionProducts = [...data.activityProducts];
      this.length = this.promotionProducts.length;
    });
  }

  changeName(event) {
    let id = this.subevents[this.selectedIndex].id;
    this.promoteService.changeTabName({
      name: this.tabName,
      id
    }).then((data) => {
      this.subevents[this.selectedIndex].name = data.name;
    });

  }

  deleteName($event) {
    let id = this.subevents[this.selectedIndex].id;
    this.promoteService.deleteTabName({
      id
    }).then(() => {
      this.subevents.splice(this.selectedIndex, 1);
      this.selectedIndex = 0;
      this.getPromotionProductList({
        index: this.selectedIndex
      });
    });
  }

  // MatPaginator Output
  changePage(event) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getPromotionProductList({
      index: this.selectedIndex
    });
  }

  getPromotionDetail(isLast?: any) {
    let id = this.campaign.id;
    this.promoteService.getPromotionDetail({
      id
    }).then((data) => {
      this.campaign = data;
      this.subevents = [...data.activityTabs];
      if(isLast) {
        this.selectedIndex = this.subevents.length - 1;
        this.getPromotionProductList({
          index: this.selectedIndex
        });
      }
    });
  }

}
