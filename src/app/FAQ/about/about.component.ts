import {Component, OnInit, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../_faq.scss']
})

@Injectable()
export class AboutComponent implements OnInit {
  addHeight: any = true;
  aboutArr = [
    'About Us',
    'Shipping Policy',
    'Return Policy',
    'Cancellation Policy',
    'Disclaimer',
    'Contact Us',
    'Privacy Policy',
    'Terms & Conditions',
  ];
  constructor(
    private router: Router,
    private userService: UserService,

  ) {
    this.userService.addNavigation('About');
    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
  }

  ngOnInit(): void {
  }
  openTmp (i) {
    // console.log(111)
    this.router.navigate([`/FAQ/about/tmp`], {queryParams: {index: i}});
  }
  calc (a, b) {
    return ((a * b) / 100).toFixed(2);
  }
}

