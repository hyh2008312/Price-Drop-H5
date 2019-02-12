import { Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { ProductService } from '../product.service';
import { UserService } from  '../../../shared/services/user/user.service';

import { AddUploadDialogComponent } from '../add-upload-dialog/add-upload-dialog.component';
import { ProductTipsComponent } from '../product-tips/product-tips.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['../product.scss']
})

export class ProductMainComponent implements OnInit {

  categoryList: any = [];
  subCategoryList: any = [];
  thirdCategoryList: any = [];

  sortList: any = [{
    value: false,
    text: 'New Arrivals'
  }, {
    value: 'price_low',
    text: 'Price Low to High'
  }, {
    value: 'price_high',
    text: 'Price High to Low'
  }];

  productPublished: any = false;
  productPublishedIndex = 1;
  catPublished: any = false;
  sortPublished: any = false;
  productPendingApproval: any = false;
  productPendingApprovalIndex = 1;
  catPending: any = false;
  sortPending: any = false;
  productDisapproved: any = false;
  productDisapprovedIndex = 1;
  catDisapproved: any = false;
  sortDisapproved: any = false;
  productDraft: any = false;
  productDraftIndex = 1;
  catDraft: any = false;
  sortDraft: any = false;
  productUnpublished: any = false;
  productUnpublishedIndex = 1;
  catUnpublished: any = false;
  sortUnpublished: any = false;
  productSelected: any = false;
  productSelectedIndex = 1;
  productDrops: any = false;
  productDropsIndex = 1;

  publishedSorted = 'Date';
  pendingSorted = 'Under Review';
  unpublishedSorted = 'Date';
  publishedSortList = ['Date', 'Most Views', 'Most Orders', 'Highest Conversion'];
  pendingSortList = ['Under Review', 'Disapproved'];
  unpublishedSortList = ['Date', 'Most Views', 'Most Orders', 'Highest Conversion'];

  searchCategory = 'sku';
  searchList = ['sku', 'product', 'shop'];

  isPendingChecked: any = false;

  selectedIndex: number = 0;
  subscription: any;

  searchKey: any = '';
  isSearch: boolean = false;
  searchForm: FormGroup;

  // MatPaginator Inputs
  length:number = 0;
  pageSize = 50;
  pageSizeOptions = [25, 50];

  isSuperuser: boolean = false;

  userPermission: any = [false, true, true, false, false, true, false];

  constructor(
    private adminService: ProductService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

    this.userService.currentUser.subscribe((data) => {
      if(data) {
        if(data.isStaff && data.isSuperuser) {
          this.isSuperuser = true
        }
      }
    });

    this.searchForm = this.fb.group({
      searchKey: ['']
    });

    this.searchForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data) {
    this.isSearch = false;
  }

  clearSearchKey() {
    this.searchKey = '';
    if(this.isSuperuser) {
      switch (this.selectedIndex) {
        case 0:
          this.productPublishedIndex = 1;
          break;
        case 1:
          this.productPendingApprovalIndex = 1;
          break;
        case 2:
          this.productDisapprovedIndex = 1;
          break;
        case 3:
          this.productUnpublishedIndex = 1;
          break;
        case 4:
          this.productDraftIndex = 1;
          break;
        case 5:
          this.productDropsIndex = 1;
          break;
        case 6:
          this.productSelectedIndex = 1;
          break;
        default:
          break;
      }
    } else {
      switch (this.selectedIndex) {
        case 0:
          this.productPublishedIndex = 1;
          break;
        case 1:
          this.productPendingApprovalIndex = 1;
          break;
        case 2:
          this.productUnpublishedIndex = 1;
          break;
        case 3:
          this.productDraftIndex = 1;
          break;
        case 4:
          this.productDropsIndex = 1;
          break;
      }
    }

    this.changeProducts({index: this.selectedIndex}, this.isSuperuser);
  }

  ngOnInit():void {
    let self = this;
    this.subscription = this.activatedRoute.queryParams.subscribe((data) => {
      switch(data.tab) {
        case 'published':
          self.selectedIndex = 0;
          break;
        case 'pending':
          self.selectedIndex = 1;
          break;
        case 'unpublished':
          self.selectedIndex = 2;
          break;
        case 'draft':
          self.selectedIndex = 3;
          break;
        case 'drops':
          self.selectedIndex = 4;
          break;
        case 'featured':
          self.selectedIndex = 5;
          break;
        default:
          self.selectedIndex = 0;
          break;
      }

      self.changeProducts({
        index: self.selectedIndex
      });
    });

    this.getCategory();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // MatPaginator Output
  changePage(event, type) {
    this.pageSize = event.pageSize;
    if(this.isSuperuser) {
      switch (type) {
        case 0:
          this.productPublishedIndex = event.pageIndex + 1;
          break;
        case 1:
          this.productPendingApprovalIndex = event.pageIndex + 1;
          break;
        case 2:
          this.productDisapprovedIndex = event.pageIndex + 1;
          break;
        case 3:
          this.productUnpublishedIndex = event.pageIndex + 1;
          break;
        case 4:
          this.productDraftIndex = event.pageIndex + 1;
          break;
        case 5:
          this.productDropsIndex = event.pageIndex + 1;
          break;
        case 6:
          this.productSelectedIndex = event.pageIndex + 1;
          break;
        default:
          break;
      }
    } else {
      switch (type) {
        case 0:
          this.productPublishedIndex = event.pageIndex + 1;
          break;
        case 1:
          this.productPendingApprovalIndex = event.pageIndex + 1;
          break;
        case 2:
          this.productUnpublishedIndex = event.pageIndex + 1;
          break;
        case 3:
          this.productDraftIndex = event.pageIndex + 1;
          break;
        case 4:
          this.productDropsIndex = event.pageIndex + 1;
          break;
      }
    }

    this.changeProducts({index: type}, this.isSuperuser);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  changeProducts(event, superUser?:any) {
    let relationStatus = 'published';
    let page = this.productPublishedIndex;
    let cat = this.catPublished;
    let sort = this.sortPublished;
    if(superUser) {
      if(event.index < 5) {
        switch (event.index) {
          case 1:
            relationStatus = 'pending';
            page = this.productPendingApprovalIndex;
            cat = this.catPending;
            sort = this.sortPending;
            break;
          case 2:
            relationStatus = 'disapproved';
            page = this.productDisapprovedIndex;
            cat = this.catDisapproved;
            sort = this.sortDisapproved;
            break;
          case 3:
            relationStatus = 'unpublished';
            page = this.productUnpublishedIndex;
            cat = this.catUnpublished;
            sort = this.sortUnpublished;
            break;
          case 4:
            relationStatus = 'draft';
            page = this.productDraftIndex;
            cat = this.catDraft;
            sort = this.sortDraft;
            break;
          default:
            break;
        }


        let self = this;
        let q = this.searchKey;
        let qt = this.searchCategory;
        if(q == '') {
          q = null;
          qt = null;
        }

        cat = cat ? cat: null;
        sort = sort ? sort: null;

        this.adminService.getProductList({
          status: relationStatus,
          page: page,
          page_size: this.pageSize,
          cat,
          sort,
          q,
          qt
        }).then((data) => {
          self.length = data.count;
          switch (event.index) {
            case 1:
              self.productPendingApproval = data.results;
              break;
            case 2:
              self.productDisapproved = data.results;
              break;
            case 3:
              self.productUnpublished = data.results;
              break;
            case 4:
              self.productDraft = data.results;
              break;
            default:
              self.productPublished = data.results;
              break;
          }


        });
      } else if(event.index == 6) {

        page = this.productSelectedIndex;
        let self = this;
        let q = this.searchKey;
        let qt = this.searchCategory;
        if(q == '') {
          q = null;
          qt = null;
        }
        this.adminService.getSelectedProductList({
          page: page,
          page_size: this.pageSize,
          q,
          qt
        }).then((data) => {
          self.length = data.count;
          self.productSelected = data.results;

        });
      } else if(event.index == 5) {

        page = this.productDropsIndex;
        let self = this;
        this.adminService.getDropsProductList({
          page: page,
          page_size: this.pageSize
        }).then((data) => {
          self.length = data.count;
          self.productDrops = data.results;

        });
      }

    } else {
      if(event.index <= 3) {
        switch (event.index) {
          case 1:
            relationStatus = 'pending';
            page = this.productPendingApprovalIndex;
            cat = this.catPending;
            sort = this.sortPending;
            break;
          case 2:
            relationStatus = 'unpublished';
            page = this.productUnpublishedIndex;
            cat = this.catUnpublished;
            sort = this.sortUnpublished;
            break;
          case 3:
            relationStatus = 'draft';
            page = this.productDraftIndex;
            cat = this.catDraft;
            sort = this.sortDraft;
            break;
          default:
            break;
        }


        let self = this;
        let q = this.searchKey;
        let qt = this.searchCategory;
        if(q == '') {
          q = null;
          qt = null;
        }

        cat = cat ? cat: null;
        sort = sort ? sort: null;

        this.adminService.getProductList({
          status: relationStatus,
          page: page,
          page_size: this.pageSize,
          cat,
          sort,
          q,
          qt
        }).then((data) => {
          self.length = data.count;
          switch (event.index) {
            case 1:
              self.productPendingApproval = data.results;
              break;
            case 2:
              self.productUnpublished = data.results;
              break;
            case 3:
              self.productDraft = data.results;
              break;
            default:
              self.productPublished = data.results;
              break;
          }

        });
      } else if(event.index == 4) {

        page = this.productDropsIndex;
        let self = this;
        this.adminService.getDropsProductList({
          page: page,
          page_size: this.pageSize
        }).then((data) => {
          self.length = data.count;
          self.productDrops = data.results;

        });
      }
    }


  }

  productChange(event) {
    switch(event.status) {
      case 0:
        switch(event.event) {
          case 'delete':
            this.productPublished.splice(event.index,1);
            break;
          case 'unpublish':
            this.productPublished.splice(event.index,1);
            break;
        }
        break;
      case 1:
        switch(event.event) {
          case 'delete':
            this.productPendingApproval.splice(event.index,1);
            break;
          case 'disapprove':
            this.productPendingApproval.splice(event.index,1);
            break;
          case 'publish':
            this.productPendingApproval.splice(event.index,1);
            break;
          case 'checked':
            this.productPendingApproval[event.index] = event.product;
            break;
        }
        break;
      case 2:
        switch(event.event) {
          case 'delete':
            this.productUnpublished.splice(event.index,1);
            break;
          case 'publish':
            this.productUnpublished.splice(event.index,1);
            break;
        }
        break;
      case 3:
        switch(event.event) {
          case 'delete':
            this.productUnpublished.splice(event.index,1);
            break;
          case 'publish':
            this.productUnpublished.splice(event.index,1);
            break;
        }
        break;
      case 5:
        switch(event.event) {
          case 'delete':
            this.productDrops.splice(event.index,1);
            break;
        }
        break;
      case 6:
        switch(event.event) {
          case 'selected':
            this.productSelected.splice(event.index,1);
            break;
        }
        break;
    }
  }

  openUploadDialog() {
    let dialogRef = this.dialog.open(AddUploadDialogComponent, {
      data: {
        isUpload: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
       if(dialogRef.componentInstance.data.isUpload == true) {
         this.selectedIndex = 0;
         this.changeProducts({index: this.selectedIndex}, this.isSuperuser);
       }
    });
  }

  checkedChange($event) {
    this.isPendingChecked = $event.change;
    for(let item of this.productPendingApproval) {
      item.isChecked = $event.change
    }
  }

  publishedWithList() {
    let product: any = [];
    for(let item of this.productPendingApproval) {
      if(item.isChecked) {
        product.push(item.id);
      }
    }

    if(product.length <= 0) {
      return this.publishedTips('You should selected at least one product!');
    }

    this.adminService.publishProducts({
      product
    }).then(() => {
      this.selectedIndex = 0;
      this.isPendingChecked = false;
      this.publishedTips('Publish Success!');
    });
  }

  publishedTips(str: any) {
    this.snackBar.openFromComponent(ProductTipsComponent, {
      data: str,
      duration: 4000,
      verticalPosition: 'top'
    });
  }

  categoryChange($event) {
    if(this.categoryList.length > 0) {
      let index = this.categoryList.findIndex((data) => {
        if(data.id == $event) {
          return true;
        }
      });
      if(this.categoryList[index] && this.categoryList[index].children) {
        this.subCategoryList = [...this.categoryList[index].children];
      } else {
        this.subCategoryList = [];
      }
      this.thirdCategoryList = [];
    }
    if(this.isSuperuser) {
      switch (this.selectedIndex) {
        case 0:
          this.productPublishedIndex = 1;
          this.catPublished = $event;
          break;
        case 1:
          this.productPendingApprovalIndex = 1;
          this.catPending = $event;
          break;
        case 2:
          this.productDisapprovedIndex = 1;
          this.catDisapproved = $event;
          break;
        case 3:
          this.productUnpublishedIndex = 1;
          this.catUnpublished = $event;
          break;
        case 4:
          this.productDraftIndex = 1;
          this.catDraft = $event;
          break;
        default:
          break;
      }
    } else {
      switch (this.selectedIndex) {
        case 0:
          this.productPublishedIndex = 1;
          this.catPublished = $event;
          break;
        case 1:
          this.productPendingApprovalIndex = 1;
          this.catPending = $event;
          break;
        case 2:
          this.productUnpublishedIndex = 1;
          this.catUnpublished = $event;
          break;
        case 3:
          this.productDraftIndex = 1;
          this.catDraft = $event;
          break;
      }
    }
    this.changeProducts({index: this.selectedIndex}, this.isSuperuser);
  }

  subCategoryChange($event) {
    if(this.subCategoryList.length > 0) {
      let index = this.subCategoryList.findIndex((data) => {
        if(data.id == $event) {
          return true;
        }
      });
      if(this.subCategoryList[index] && this.subCategoryList[index].children) {
        this.thirdCategoryList = [...this.subCategoryList[index].children];
      } else {
        this.thirdCategoryList = [];
      }
    }
    if(this.isSuperuser) {
      switch (this.selectedIndex) {
        case 0:
          this.productPublishedIndex = 1;
          this.catPublished = $event;
          break;
        case 1:
          this.productPendingApprovalIndex = 1;
          this.catPending = $event;
          break;
        case 2:
          this.productDisapprovedIndex = 1;
          this.catDisapproved = $event;
          break;
        case 3:
          this.productUnpublishedIndex = 1;
          this.catUnpublished = $event;
          break;
        case 4:
          this.productDraftIndex = 1;
          this.catDraft = $event;
          break;
        default:
          break;
      }
    } else {
      switch (this.selectedIndex) {
        case 0:
          this.productPublishedIndex = 1;
          this.catPublished = $event;
          break;
        case 1:
          this.productPendingApprovalIndex = 1;
          this.catPending = $event;
          break;
        case 2:
          this.productUnpublishedIndex = 1;
          this.catUnpublished = $event;
          break;
        case 3:
          this.productDraftIndex = 1;
          this.catDraft = $event;
          break;
      }
    }
    this.changeProducts({index: this.selectedIndex}, this.isSuperuser);
  }

  thirdCategoryChange($event) {
    if(this.isSuperuser) {
      switch (this.selectedIndex) {
        case 0:
          this.productPublishedIndex = 1;
          this.catPublished = $event;
          break;
        case 1:
          this.productPendingApprovalIndex = 1;
          this.catPending = $event;
          break;
        case 2:
          this.productDisapprovedIndex = 1;
          this.catDisapproved = $event;
          break;
        case 3:
          this.productUnpublishedIndex = 1;
          this.catUnpublished = $event;
          break;
        case 4:
          this.productDraftIndex = 1;
          this.catDraft = $event;
          break;
        default:
          break;
      }
    } else {
      switch (this.selectedIndex) {
        case 0:
          this.productPublishedIndex = 1;
          this.catPublished = $event;
          break;
        case 1:
          this.productPendingApprovalIndex = 1;
          this.catPending = $event;
          break;
        case 2:
          this.productUnpublishedIndex = 1;
          this.catUnpublished = $event;
          break;
        case 3:
          this.productDraftIndex = 1;
          this.catDraft = $event;
          break;
      }
    }
    this.changeProducts({index: this.selectedIndex}, this.isSuperuser);
  }

  getCategory() {
    this.adminService.getCategoryList().then((data) => {
      this.categoryList = [...data];
      this.categoryList.unshift({
        id: false,
        data: {
          name: 'All'
        }
      })
    });
  }

  sortChange($event) {
    if(this.isSuperuser) {
      switch (this.selectedIndex) {
        case 0:
          this.productPublishedIndex = 1;
          this.sortPublished = $event;
          break;
        case 1:
          this.productPendingApprovalIndex = 1;
          this.sortPending = $event;
          break;
        case 2:
          this.productDisapprovedIndex = 1;
          this.sortDisapproved = $event;
          break;
        case 3:
          this.productUnpublishedIndex = 1;
          this.sortUnpublished = $event;
          break;
        case 4:
          this.productDraftIndex = 1;
          this.sortDraft = $event;
          break;
        default:
          break;
      }
    } else {
      switch (this.selectedIndex) {
        case 0:
          this.productPublishedIndex = 1;
          this.sortPublished = $event;
          break;
        case 1:
          this.productPendingApprovalIndex = 1;
          this.sortPending = $event;
          break;
        case 2:
          this.productUnpublishedIndex = 1;
          this.sortUnpublished = $event;
          break;
        case 3:
          this.productDraftIndex = 1;
          this.sortDraft = $event;
          break;
      }
    }
    this.changeProducts({index: this.selectedIndex}, this.isSuperuser);
  }

}
