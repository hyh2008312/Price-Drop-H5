import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-account-balance-withdraw-money-dialog',
  templateUrl: './account-balance-withdraw-money-dialog.component.html',
  styleUrls: ['../_account.scss']
})
export class AccountBalanceWithdrawMoneyDialogComponent implements OnInit {
  // 区分不同的布局界面 1：体现金额不足的提示  2.正常的体现界面  3.去添加银行卡
  status: number = 2;
  money: number;

  constructor(public dialogRef: MatDialogRef<AccountBalanceWithdrawMoneyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {

  }

  close(): void {
    this.dialogRef.close();
  }
}
