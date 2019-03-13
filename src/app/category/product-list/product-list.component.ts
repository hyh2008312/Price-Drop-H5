import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICarouselConfig, AnimationConfig } from '../../shared/components/angular4-carousel/index';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./_product-list.scss']
})

export class ProductListComponent implements OnInit {

  categoryList: any = ['Headphones', 'Mobile Chargers', 'Mobile Cables'];

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    // this.getBanner();
  }

  getBanner() {
    // this.landingPageService.getBanner().then((res) => {
    //   for(let item of res) {
    //     this.banner.push(item.image);
    //   }
    // });
  }
}
