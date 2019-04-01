import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['../_faq.scss']
})

export class FaqComponent implements OnInit {

  banner: any = [];
  @Input() goods: any = {};
  returnStu = true;
  addHeight: any = '';
  constructor(
    private router: Router,
    private userService: UserService,

  ) {
    this.userService.addNavigation('Payment Fail');
    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
  }

  ngOnInit():void {
  }
  openDec () {
    // console.log(111)
    // this.router.navigate([`/goodsDescription`], {queryParams: {goods: this.goods}});
  }
  calc (a, b) {
    return ((a * b) / 100).toFixed(2);
  }
}

