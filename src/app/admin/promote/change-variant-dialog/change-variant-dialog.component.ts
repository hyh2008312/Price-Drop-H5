import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PromoteService } from '../promote.service';

@Component({
  selector: 'app-promote-change-variant-dialog',
  templateUrl: './change-variant-dialog.component.html',
  styleUrls: ['../_promote.scss']
})

export class ChangeVariantDialogComponent implements OnInit {

  currency: string = 'USD';
  variantPromotions: any;

  constructor(
    public dialogRef: MatDialogRef<ChangeVariantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private promoteService: PromoteService
  ) {
    this.promoteService.getPromotionVariantsList({
      id: data.productId
    }).then((data) => {
      this.variantPromotions = [...data];
    })
  }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

  variantChange($event) {
    switch($event.event) {
      case 'edit':
        this.data.isEdit = true;
        break;
      case 'delete':
        this.data.variantPromotions.splice($event.index,1);
        this.data.isEdit = true;
        break;
    }
  }


}
