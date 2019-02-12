import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginDialogComponent } from '../../../login/login/login-dialog.component';
import { SignUpDialogComponent } from '../../../login/sign-up/sign-up-dialog.component';

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

  openLogIn(): void {
    this.isPopOpen = false;

    let dialogRef = this.dialog.open(LoginDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openSignUp(): void {
    this.isPopOpen = false;

    let dialogRef = this.dialog.open(SignUpDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  isPopOpen: boolean = false;

  openPop() {
    this.isPopOpen = !this.isPopOpen;
  }


}
