
import { Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { HomeService } from '../home.service';

@Component({
  selector: 'app-warehouse-home-wrong-dialog',
  templateUrl: './home-wrong-dialog.component.html',
  styleUrls: ['../_home.scss']
})

export class HomeWrongDialogComponent implements OnInit {

  purchaseForm : FormGroup;
  error: any = false;

  warehouseList: any;

  get purchaseVariants() { return this.purchaseForm.get('purchaseVariants') as FormArray; }

  constructor(
    public dialogRef: MatDialogRef<HomeWrongDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private homeService: HomeService
  ) {

    this.purchaseForm = this.fb.group({
      id: ['', Validators.required],
      notes: ['']
    });

    this.purchaseForm.patchValue({
      id: this.data.item.id,
      notes: this.data.item.notes
    });

  }

  ngOnInit() {}

  ngOnDestroy() {}

  close() {
    this.dialogRef.close();
  }

  publish() {
    if(this.purchaseForm.invalid) {
      return;
    }
    this.homeService.purchaseWrong(this.purchaseForm.value).then((data) => {
      if(data.id) {
        this.error = false;
        this.data.isEdit = true;
        this.data.item = data;
        this.close();
      } else {
        this.error = data.detail;
      }
    }).catch((error) => {
      this.error = error;
    });
  }

}
