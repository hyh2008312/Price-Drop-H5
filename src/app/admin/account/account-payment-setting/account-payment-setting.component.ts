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
  selector: 'app-account-payment-setting-main',
  templateUrl: './account-payment-setting.component.html',
  styleUrls: ['../_account.scss']
})

export class AccountPaymentSettingComponent implements OnInit {

  // MatPaginator Inputs
  length: number = 32;
  pageSize = 12;
  pageSizeOptions = [6, 12];

  paypalEmail: any = 'Luzhenqiang@xberts.com';
  paypalEmailForm: FormGroup;
  //是否有paypal的电子邮箱
  isHavePaypal: boolean = true;

  constructor(private router: Router,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private fb: FormBuilder) {
    this.paypalEmailForm = this.fb.group({
      paypalEmail: ['']
    });
  }

  ngOnInit(): void {

  }

  changeEmail(): void {
    this.isHavePaypal = true;
  }

  saveEmail(): void {
    this.isHavePaypal = false;
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
