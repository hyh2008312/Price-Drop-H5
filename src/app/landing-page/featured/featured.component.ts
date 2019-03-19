import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from '../landing-page.service';
import { UserService } from '../../shared/services/user/user.service';
import { ChangeEvent } from 'ngx-virtual-scroller';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['../_landing-page.scss']
})

export class FeaturedComponent implements OnInit {

  @Input() featuredProductList: any = [];
  @Input() buffer: any[] = [];
  loading: boolean;
  products: any = [];

  constructor(
    private router: Router,
    private landingPageService: LandingPageService
  ) {}

  ngOnInit():void {
  }
  getFeaturedProduct() {
    this.landingPageService.getFeaturedProduct().then((res) => {
      console.log(res.results)
      if (res) {
        // this.featuredProductList = res
        this.featuredProductList = this.tranArr(res.results);

        this.buffer.push(...this.featuredProductList);
      }
    });
  }

  onListChange(event: ChangeEvent) {
    if (event.end !== this.buffer.length-1) return;
    this.loading = true;
    console.log(111)
      this.landingPageService.getFeaturedProduct().then((res) => {
        console.log(res.results)
        if (res) {
          // this.featuredProductList = res
          const chunk = this.tranArr(res.results);

          this.buffer = this.buffer.concat(chunk);
          this.loading = false;
        }
      });

  }

  fetchNextChunk(skip: number, limit: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
    });
  }

  countOff (s, o) {
    if (o > 0) {
      return Math.ceil((o - s) / o * 100) + '%'
    } else {
      return ''
    }
  }

  tranArr (data) {
    let arr = [];
    let goods3 = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      arr.push(item);
      if ((i > 0 && i % 2 === 1) || (i === data.length - 1)) {
        goods3.push(arr);
        arr = [];
      }
    }
    return goods3
  }
}
