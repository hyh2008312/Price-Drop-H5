import {Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, NavigationStart, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import {AdminService} from '../../admin.service';
import {UserService} from '../../../shared/services/user/user.service';
import {AccountService} from "../account.service";
import {MatDialog} from "@angular/material";
import {AccountBalanceWithdrawMoneyDialogComponent} from "../account-balance-withdraw-money-dialog/account-balance-withdraw-money-dialog.component";

@Component({
  selector: 'app-account-balance-main',
  templateUrl: './account-balance.component.html',
  styleUrls: ['../_account.scss']
})

export class AccountBalanceComponent implements OnInit {

  // MatPaginator Inputs
  length: number = 32;
  pageSize = 12;
  pageSizeOptions = [6, 12];

  isShowTip: boolean = false;

  constructor(private router: Router,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private fb: FormBuilder) {

  }

  ngOnInit(): void {

  }

  //是否进行显示 tip
  changeShowTip(isShow: boolean): void {
    this.isShowTip = isShow;
  }

  //打开提现按钮
  openWithdrawMoney() {
    let dialogRef = this.dialog.open(AccountBalanceWithdrawMoneyDialogComponent, {
      disableClose: true,
      data: {name: 'Luzhenqiang'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
