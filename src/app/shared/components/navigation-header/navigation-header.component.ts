import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./_navigation-header.scss']
})

export class NavigationHeaderComponent implements OnInit {

  display: boolean = true;

  constructor(
    private dialog: MatDialog
  ) {

  }

  ngOnInit():void {

  }

  close() {
    this.display = !this.display;
  }


}
