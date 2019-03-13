import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICarouselConfig, AnimationConfig } from '../../shared/components/angular4-carousel/index';
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

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.categoryService.getList().then((res) => {
      this.tagList = [...res]
      this.categoryList = [...this.tagList[0].subCat]
    });
  }
  selTag (index, i) {
    this.flag = index;
    this.categoryList = [...i.subCat]
  }

  tranString (s) {
    if (s.indexOf('&') !== -1 && s.length >= 13) {
      // str2 = s.replace("\\n", " \n ");
      // s.substring(0, s.indexOf('&'))
      return s.replace(' & ', '\n')
    } else {
      if (s.length >= 18) {
        return s.replace(' ', '\n')
      } else {
        return s
      }
    }
  }
  tranArr (data) {
    let arr = [];
    const rArr = [];
    // this.$notice.alert({
    //     message: data
    // })
    // if (data.length >= 4) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      arr.push(item);
      if ((i > 0 && i % 3 === 2) || i === data.length - 1) {
        rArr.push(arr);
        arr = [];
      }
    }
    // this.$notice.alert({
    //     message: rArr[0]
    // })
    return rArr //  4个一个的二维数组
    // } else {
    //
    //     return data
    // }
  }
}
