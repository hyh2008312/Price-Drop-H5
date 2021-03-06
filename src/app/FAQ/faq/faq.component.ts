import {Component, OnInit, Input, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['../_faq.scss']
})

@Injectable()
export class FaqComponent implements OnInit {
  addHeight: any = true;
  faqArr = [
    'My Drops FAQs',
    'My Orders FAQs',
    'Shipping FAQs',
    'Voucher FAQs',
    'COD Delivery FAQs',
    'Customs Duty FAQs',
    'Returns FAQs',
    'Payment FAQs',
  ];
  constructor(
    private router: Router,
    private userService: UserService,

  ) {
    this.userService.addNavigation('FAQ');
    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
  }

  ngOnInit(): void {



  }
  openTmp (i) {
    // console.log(111)
    this.router.navigate([`/FAQ/tmp`], {queryParams: {index: i}});
  }
  calc (a, b) {
    return ((a * b) / 100).toFixed(2);
  }
}

