import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-sizeChart-add-tab-dialog',
  templateUrl: './add-tab-dialog.component.html',
  styleUrls: ['../_sizeChart.scss']
})

export class AddTabDialogComponent implements OnInit {

  currency: string = 'USD';

  searchKey: any = '';
  isSearch: boolean = false;
  activityTabForm: FormGroup;

  error: any = false;

  length = 12;
  page = 1;
  pageSize = 6;

  constructor(
    public dialogRef: MatDialogRef<AddTabDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {

    this.activityTabForm = this.fb.group({
      name: ['']
    });

  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  publish() {
    this.data.name = this.activityTabForm.value.name;
    this.data.isEdit = true;
    this.close();
  }

}
