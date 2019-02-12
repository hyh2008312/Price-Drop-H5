 import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-category-list-dialog',
  templateUrl: './category-list-dialog.component.html',
  styleUrls: ['../_dashboard.scss']
})

export class CategoryListDialogComponent implements OnInit {

  list: any;
  isLoading: any = false;
  color = 'accent';
  mode = 'indeterminate';
  value = 50;

  constructor(
    public dialogRef: MatDialogRef<CategoryListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dashboardService: DashboardService
  ) {

  }

  ngOnInit():void {
    this.getCategory();
  }

  close():void {
    this.dialogRef.close();
  }

  getCategory() {
    this.isLoading = true;
    this.dashboardService.getCategoryMainProductDetailList().then((res) => {
      this.isLoading = false;
      this.list = [...res];
    });
  }



}
