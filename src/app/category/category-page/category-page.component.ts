import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user/user.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./_category-page.scss']
})

export class CategoryPageComponent implements OnInit {

  categoryList: any = [];
  flag: any= 0;
  tagList: any = [];

  addHeight: any = false;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private userService: UserService
  ) {
    this.userService.addNavigation('Category');
    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.categoryService.getList().then((res) => {
      this.tagList = [...res];
      this.categoryList = [...this.tagList[0].subCat]
    });
  }
  selTag (index, i) {
    this.flag = index;
    this.categoryList = [...i.subCat];
  }
  openProductList(item) {
    console.log(item.id);
  }
  tranString (s) {
    if (s.indexOf('&') !== -1 && s.length >= 13) {
      return s.replace(' & ', '\n');
    } else {
      if (s.length >= 18) {
        return s.replace(' ', '\n');
      } else {
        return s;
      }
    }
  }
  tranArr (data) {
    let arr = [];
    const rArr = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      arr.push(item);
      if ((i > 0 && i % 3 === 2) || i === data.length - 1) {
        rArr.push(arr);
        arr = [];
      }
    }
    return rArr;
  }
}
