import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./_navigation-header.scss']
})

export class NavigationHeaderComponent implements OnInit {

  display: boolean = true;

  constructor(
    private userService: UserService
  ) {
    this.userService.addCloseDownload(this.display);
  }

  ngOnInit():void {

  }

  close() {
    this.display = !this.display;
    this.userService.addCloseDownload(this.display);
  }


}
