import { Component, OnInit, ViewChild } from '@angular/core';

import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface
} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-landing-slide',
  templateUrl: './landing-slide.component.html',
  styleUrls: ['../_landing-page.scss']
})
export class LandingSlideComponent implements OnInit {

  slideIndex: number = 0;

  disabled: boolean = false;

  public slides = [{
    slideImage: 'https://media.socialcommer.com/source/web/pic/landing-group-20180426.png',
    image: 'https://media.socialcommer.com/source/web/pic/landing-group2-20180426.png',
    title: 'Maryam Hampton\'s Collections',
    content: 'Make your life look way more glamorous than it really is',
    avatar: 'https://media.socialcommer.com/image/other/b035babd-1171-4235-a4fa-464645568919.jpg',
    name: 'Maria Brural',
    url: 'https://www.socialcommer.com/store/maryamhampton/6'
  },{
    slideImage: 'https://media.socialcommer.com/source/web/pic/landing-group-20180426.png',
    image: 'https://media.socialcommer.com/source/web/pic/landing-group2-20180426.png',
    title: 'Maryam Hampton\'s Collections',
    content: 'Make your life look way more glamorous than it really is',
    avatar: 'https://media.socialcommer.com/image/other/b035babd-1171-4235-a4fa-464645568919.jpg',
    name: 'Maria Brural',
    url: 'https://www.socialcommer.com/store/maryamhampton/6'
  }];

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    speed: 800,
    loop: false,
    autoplay: false,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: false
  };

  @ViewChild(SwiperComponent) componentRef: SwiperComponent;

  constructor() { }

  public onIndexChange(index: number): void {
    this.slideIndex = index;
  }

  changeIndex(index) {
    this.slideIndex = index;
    this.componentRef.directiveRef.setIndex(this.slideIndex);
  }

  ngOnInit() {
  }

}
