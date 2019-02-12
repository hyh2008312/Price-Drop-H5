import {Input, Output, Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

import { ToolTipsComponent } from '../tool-tips/tool-tips.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['../_account.scss']
})

export class AccountSettingComponent implements OnInit {
  @Input() status: number = 1;

  currency: string = 'USD';

  accountSettingForm: FormGroup;

  resetSetting: any = {
    name: '',
    company: ''
  }

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.accountSettingForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.accountService.getSupplier().then((data) => {
      this.resetSetting = data;
      this.accountSettingForm.patchValue({
        company: data.company,
        name: data.name
      });
    });
  }

  edit() {
    if(this.accountSettingForm.invalid) {
      return;
    }
    this.accountService.editSupplier(this.accountSettingForm.value).then((data) => {
      this.openSnackBar('Edit your supplier information success!');

      this.resetSetting = data;
    });
  }

  openSnackBar(str: any) {
    this.snackBar.openFromComponent(ToolTipsComponent, {
      data: str,
      duration: 4000,
      verticalPosition: 'top'
    });
  }

  reset() {
    this.accountSettingForm.patchValue({
      company: this.resetSetting.company,
      name: this.resetSetting.name
    });
    this.openSnackBar('Reset your supplier information success!');
  }


}
