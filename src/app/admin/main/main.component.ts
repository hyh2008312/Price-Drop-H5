import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminService } from '../admin.service';
import { UserService } from  '../../shared/services/user/user.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['../_admin.scss']
})

export class MainComponent implements OnInit {

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

  }

  ngOnInit():void {

  }

  logout() {

  }

}
