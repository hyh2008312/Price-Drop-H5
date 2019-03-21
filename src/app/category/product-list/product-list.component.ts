import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import {UserService} from '../../shared/services/user/user.service';

@Component({
  selector: 'app-category-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./_product-list.scss']
})

export class ProductListComponent implements OnInit {

  categoryList: any = [];
  titleName: any = '';
  ProductList: any = [];
  notification: any = [];
  selId: any =  false;
  sort: any =  false;
  loading: any =  false;
  page: any = 1;
  pageSize: any = 12;
  value = 36;
  addHeight: any = false;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef

) {
    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
  }

  ngOnInit(): void {
    this.getCategoryTitle();
    this.getNotification();
    this.getSubCategory();
    this.getProduct();
  }

  getCategoryTitle () {
    let id = this.activatedRoute.snapshot.params['id'];
    this.categoryService.getTitle(id).then((res) => {
      this.titleName = res.name
      this.userService.addNavigation(this.titleName);
    }).catch((res) => {
        console.log(res)
    })
  }
  getProduct () {
    let id = this.activatedRoute.snapshot.params['id'];
    let cId  = id
    if (this.selId) {
      cId = this.selId
    }
    let params = {
      'cat' : cId,
      'page' : this.page,
      'page_size' : this.pageSize,
      'sort' : this.sort,
    }
    this.categoryService.getProduct(params).then((res) => {
      // console.log(res)
        let arr = [];
        for (let i = 0; i < res.results.length; i++) {
          const item = res.results[i];
          arr.push(item);
          if ((i > 0 && i % 2 == 1) || i == res.results.length - 1) {
            this.ProductList.push(arr);
            arr = [];
          }
        }
      this.page++;
      this.loading = false;
      // this.changeDetectorRef.markForCheck();
      // this.changeDetectorRef.detectChanges();
    }).catch((res) => {
        console.log(res)
    })
  }
  onUp(ev) {
    console.log('scrolled up!', ev);
  }

  onScrollDown (ev) {
    this.loading = true;
    console.log('scrolled down!', ev);
    this.getProduct();
  }
  getSubCategory () {
    let id = this.activatedRoute.snapshot.params['id'];
    this.categoryService.getSubCategory(id).then((res) => {
      console.log(res)
     this.categoryList = res
      this.categoryList.unshift({
        id: false,
        name: 'All'
      });
    }).catch((res) => {
        console.log(res)
    })
  }
  getNotification () {
    this.categoryService.getNotification().then((res) => {
      this.notification = res
    }).catch((res) => {
        console.log(res)
    })
  }
  selHtag(id) {
    console.log(id)
    if (this.selId != id) {
      this.selId = id;
    } else {
      this.selId = false;
    }
    // this.changeDetectorRef.markForCheck();
    // this.changeDetectorRef.detectChanges();
    this.getProduct();
  }
}
