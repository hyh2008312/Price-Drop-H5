import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AddressService } from '../address.service';
import { ToolTipsComponent } from '../tool-tips/tool-tips.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-address-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['../_address.scss']
})

export class AddressItemComponent implements OnInit {

  @Input() status = 0;
  @Input() item: any = {};
  @Input() index: any = 0;

  constructor(
    private addressService: AddressService,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit():void {

  }

  delete() {
    this.addressService.deleteAddress({
      id: this.item.id
    }).then(() => {
      this.openSnackBar('Delete Address Success');
    });
  }

  openSnackBar(str: any) {
    this.snackBar.openFromComponent(ToolTipsComponent, {
      data: str,
      duration: 4000,
      verticalPosition: 'top'
    });
  }
}
