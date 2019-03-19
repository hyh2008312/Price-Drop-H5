import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ICarouselConfig, AnimationConfig } from '../../shared/components/angular4-carousel/index';
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


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef

) {

  }

  ngOnInit(): void {
    this.getCategoryTitle();
    this.getNotification();
    this.getSubCategory();
    this.getProduct(false);
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
  getProduct (selId) {
    let id = this.activatedRoute.snapshot.params['id'];
    this.categoryService.getProduct(id, selId).then((res) => {
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
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    }).catch((res) => {
        console.log(res)
    })
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
    this.changeDetectorRef.markForCheck();
    this.getProduct(this.selId);
    this.changeDetectorRef.detectChanges();
  }
}
