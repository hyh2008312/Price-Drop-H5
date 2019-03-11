import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICarouselConfig, AnimationConfig } from '../../shared/components/angular4-carousel/index';
import { LandingPageService } from '../landing-page.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['../_landing-page.scss']
})

export class LandingPageComponent implements OnInit {

  banner: any = [];

  constructor(
    private router: Router,
    private landingPageService: LandingPageService
  ) {}

  ngOnInit():void {
    this.getBanner();
  }

  getBanner() {
    this.landingPageService.getBanner().then((res) => {
      for(let item of res) {
        this.banner.push(item.image);
      }
    });
  }
}
