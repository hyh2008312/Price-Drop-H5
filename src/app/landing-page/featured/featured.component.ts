import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from '../landing-page.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['../_landing-page.scss']
})

export class FeaturedComponent implements OnInit {

  @Input() featuredProductList: any = [];
  products: any = [];

  constructor(
    private router: Router,
    private landingPageService: LandingPageService
  ) {}

  ngOnInit():void {
  }
  countOff (s, o) {
    if (o > 0) {
      return Math.ceil((o - s) / o * 100) + '%'
    } else {
      return ''
    }
  }
}
