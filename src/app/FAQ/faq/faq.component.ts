import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['../_faq.scss']
})

export class FaqComponent implements OnInit {

  banner: any = [];
  addHeight: any = '';
  constructor(
    private router: Router,
    private userService: UserService,

  ) {
    this.userService.addNavigation('FAQ');
    this.userService.closeDownload.subscribe((data) => {
      this.addHeight = data;
    });
  }

  ngOnInit():void {
  }
}

