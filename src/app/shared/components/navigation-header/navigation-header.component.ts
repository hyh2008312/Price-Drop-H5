import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


import {AuthenticationService} from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./_navigation-header.scss']
})

export class NavigationHeaderComponent implements OnInit {

  @Input() status: boolean = false;
  @Input() source: any = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

  }

  ngOnInit():void {

  }

  isPopOpen: boolean = false;

  openPop() {
    this.isPopOpen = !this.isPopOpen;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/account/user-share']);
  }


}
