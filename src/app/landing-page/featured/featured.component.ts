import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from '../landing-page.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['../_landing-page.scss']
})

export class FeaturedComponent implements OnInit {

  @Input() item: any = [];

  constructor(
    private router: Router,
    private landingPageService: LandingPageService
  ) {}

  ngOnInit():void {
  }

}
