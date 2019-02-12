import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AddressService } from '../address.service';
import { UserService } from  '../../../shared/services/user/user.service';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToolTipsComponent} from '../../account/tool-tips/tool-tips.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-address-address-main',
  templateUrl: './address-main.component.html',
  styleUrls: ['../_address.scss']
})

export class AddressMainComponent implements OnInit {

  addressList: any;
  index: any = 1;

  // MatPaginator Inputs
  length:number = 0;
  pageSize = 100;
  pageSizeOptions = [100];

  currency: string = 'USD';

  accountSettingForm: FormGroup;

  resetSetting: any = {
    name: '',
    company: ''
  }

  // MatPaginator Output
  changePage(event) {
    this.pageSize = event.pageSize;
    this.index = event.pageIndex + 1;
    this.getAddressList();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.accountSettingForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required]
    });

    this.addressService.getSupplier().then((data) => {
      this.resetSetting = data;
      this.accountSettingForm.patchValue({
        company: data.company,
        name: data.name
      });
    });
  }

  ngOnInit():void {
    this.getAddressList();
  }

  getAddressList() {

    this.addressService.getAddressList({
      page: this.index,
      pageSize: this.pageSize
    }).then((data) => {
      this.length = data.count;
      this.addressList = [...data.results];
    });

  }

  edit() {
    if(this.accountSettingForm.invalid) {
      return;
    }
    this.addressService.editSupplier(this.accountSettingForm.value).then((data) => {
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
