import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./_navigation-header.scss']
})

export class NavigationHeaderComponent implements OnInit {

  @Input() status: boolean = false;

  constructor(
    private dialog: MatDialog
  ) {

  }

  ngOnInit():void {

  }

  isPopOpen: boolean = false;

  openPop() {
    this.isPopOpen = !this.isPopOpen;
  }


}
