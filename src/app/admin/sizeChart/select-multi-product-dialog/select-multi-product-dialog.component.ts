import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SizeChartService } from '../sizeChart.service';
import { MatSnackBar } from '@angular/material';
import {ToolTipsComponent} from '../tool-tips/tool-tips.component';

@Component({
  selector: 'app-sizeChart-select-multi-product-dialog',
  templateUrl: './select-multi-product-dialog.component.html',
  styleUrls: ['../_sizeChart.scss']
})

export class SelectMultiProductDialogComponent implements OnInit {

  min: any;
  max: any;

  constructor(
    public dialogRef: MatDialogRef<SelectMultiProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sizeChartService: SizeChartService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

  confirm() {
    let params: any = {};
    params.chartId = this.data.promotionId;
    params.productId = [];

    if(this.min && this.max) {
      for(let i = this.min; i <= this.max;i++) {
        params.productId.push(i);
      }
    } else if( this.min) {
      params.productId.push(this.min);
    } else if( this.max) {
      params.productId.push(this.max);
    } else {
      this.openSnackBar('The Product Id field is empty!');
      return;
    }

    this.sizeChartService.addProduct(params).then(((data) => {
      if(data && data.detail) {
        this.openSnackBar(data.detail);
      } else {
        this.openSnackBar('Add successfully!');
        this.data.isEdit = true;
        this.close();
      }
    }));
  }

  openSnackBar(str: any) {
    this.snackBar.openFromComponent(ToolTipsComponent, {
      data: str,
      duration: 4000,
      verticalPosition: 'top'
    });
  }
}
