import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { SpecificationService } from '../specification.service';

@Component({
  selector: 'app-specification-add-category-attribute-value-list-dialog',
  templateUrl: './add-category-attribute-value-list-dialog.component.html',
  styleUrls: ['../_specification.scss']
})

export class AddCategoryAttributeValueListDialogComponent implements OnInit {

  attributeForm : FormGroup;

  selectable = true;
  removable = true;

  attributesValue: any = [];

  constructor(
    public dialogRef: MatDialogRef<AddCategoryAttributeValueListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private specificationService: SpecificationService
  ) {

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  create() {
    if(this.attributeForm.invalid) {
      return;
    }

    let self = this;
    this.specificationService.attributeCreate(this.attributeForm.value).then((data) => {
      if(data.id) {
        self.close();
        self.data.isAddAttribute = true;
      }
    });
  }

  add(event): void {
    const index = this.data.attributesValue.findIndex((e) => {
      return e.specificationValueContent == event;
    });

    if (index >= 0) {
      return;
    }


    let arr: any = [...this.data.attributesValue];
    arr.push(event);
    const specificationValues = arr.join(',');

    this.specificationService.addCategoryAttributeValue({
      id: this.data.id,
      specificationValues
    }).then((data) => {
      this.data.attributesValue.push(event);
    });
  }

  remove(params: any): void {
    const index = this.data.attributesValue.findIndex((e) => {
      return e == params;
    });

    if (index >= 0) {
      let arr: any = [...this.data.attributesValue];
      arr.splice(index, 1);
      const specificationValues = arr.join(',');

      this.specificationService.addCategoryAttributeValue({
        id: this.data.id,
        specificationValues
      }).then(() => {
        this.data.attributesValue.splice(index, 1);
      });
    }


  }
}
