import { Component, OnInit, OnDestroy, Inject, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { HomeService } from '../home.service';

@Component({
  selector: 'app-warehouse-home-complete-dialog',
  templateUrl: './home-complete-dialog.component.html',
  styleUrls: ['../_home.scss']
})

export class HomeCompleteDialogComponent implements OnInit {

  purchaseForm : FormGroup;
  error: any = false;

  warehouseList: any;

  get purchaseVariants() { return this.purchaseForm.get('purchaseVariants') as FormArray; }

  constructor(
    public dialogRef: MatDialogRef<HomeCompleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private homeService: HomeService
  ) {

    this.getWarehouseList();

    this.purchaseForm = this.fb.group({
      id: ['', Validators.required],
      purchaseVariants: this.fb.array([]),
      warehouseId: [''],
      notes: ['']
    });

    this.purchaseForm.patchValue({
      id: this.data.item.id,
      notes: this.data.item.notes,
      warehouseId: this.data.item.warehouseId
    });

    for(let item of this.data.item.purchaseVariants) {
      this.purchaseVariants.push(this.fb.group({
        id: [item.id],
        mainImage: [item.mainImage],
        title: [item.title],
        attribute: [item.attribute],
        sku: [item.sku],
        quantity: [item.quantity],
        receiveQuantity: [item.receiveQuantity, [Validators.required, Validators.max(item.quantity)]],
      }));
    }

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
    this.homeService.purchaseComplete(this.purchaseForm.value).then((data) => {
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

  getWarehouseList() {
    this.homeService.getWarehouseList().then((data) => {
      this.warehouseList = [...data];
    });
  }

}
