import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { TopicService } from '../../topic.service';

import { SelectProductDialogComponent } from  '../../select-product-dialog/select-product-dialog.component';

import { AddTabDialogComponent } from  '../../add-tab-dialog/add-tab-dialog.component';

@Component({
  selector: 'app-topic-topic-edit-2',
  templateUrl: './topic-edit-2.component.html',
  styleUrls: ['../../_topic.scss']
})

export class TopicEditTwoComponent implements OnInit {

  templateName: any = '';

  promotionForm: FormGroup;

  selectedIndex: any = 0;

  id: any = '';
  @Input() templateId: any = 1;
  @Output() isEditChange = new EventEmitter<any>();

  // MatPaginator Inputs
  length:number = 0;
  pageSize = 50;
  pageSizeOptions = [50];

  promotionProducts: any = [];

  categoryList: any;

  image: any;

  subevents: any = false;

  tabName: any = '';

  additionalList: any = ['', ''];
  additionalSrcs: any = ['', ''];

  constructor(
    private promoteService: TopicService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.id = this.activatedRoute.snapshot.params['id'];

    this.promotionForm = this.fb.group({
      id: [this.id],
      name: ['', Validators.required],
      image: [''],
      color: [''],
      tabColor: [''],
      templateId: [this.templateId, Validators.required]
    });


    this.getPromotionDetail()
  }

  // MatPaginator Output
  changePage(event) {}

  getPromotionDetail(isLast?: any) {
    let id = this.id;
    this.promoteService.getPromotionDetail({
      id
    }).then((data) => {
      this.promotionForm.patchValue({
        id: data.id,
        name: data.name,
        color: data.color,
        tabColor: data.tabColor
      });
      this.image = data.image;
      this.templateName = data.templateName;
      this.additionalList = data.templateContentJson.images;
      this.additionalSrcs = data.templateContentJson.images;
      this.subevents = [...data.activityTabs];
      if(isLast) {
        this.selectedIndex = this.subevents.length - 1;
        this.getPromotionProductList({
          index: this.selectedIndex
        });
      } else {
        this.getPromotionProductList({
          index: this.selectedIndex
        });
      }
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

  save() {
    if(this.promotionForm.invalid) {
      return;
    }

    let params = this.promotionForm.value;

    params.image = this.image;

    params.templateJson = {
      images: this.additionalList
    };

    this.promoteService.promotionEdit(this.promotionForm.value).then((data) => {
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
        activityId: this.id,
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


}
