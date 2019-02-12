import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { SpecificationService } from '../specification.service';

@Component({
  selector: 'app-specification-add-attribute-value-list-dialog',
  templateUrl: './add-attribute-value-list-dialog.component.html',
  styleUrls: ['../_specification.scss']
})

export class AddAttributeValueListDialogComponent implements OnInit {

  attributeForm : FormGroup;

  selectable = true;
  removable = true;

  attributesValue: any = [];

  get specificationValues() { return this.attributeForm.get('specificationValues') as FormArray; }

  constructor(
    public dialogRef: MatDialogRef<AddAttributeValueListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private specificationService: SpecificationService
  ) {
    this.attributeForm = this.fb.group({
      specificationId: [this.data.id, Validators.required],
      specificationValues: this.fb.array([])
    });

    this.addSpecificationValues();
  }

  deleteSpecificationValues(i) {
    this.specificationValues.removeAt(i);
  }

  addSpecificationValues() {
    this.specificationValues.push(this.fb.group({
      context: ['', Validators.required],
      chineseContext: ['', Validators.required]
    }));
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
    this.specificationService.attributeCreateList(this.attributeForm.value).then((data) => {
      this.data.attributesValue = [...data];
      this.specificationValues.controls = [];
    });
  }

  add(event): void {
    const index = this.data.attributesValue.findIndex((e) => {
      return e.specificationValueContent == event.name;
    });

    if (index >= 0) {
      return;
    }
    this.specificationService.addAttributeValue({
      specificationId: this.data.id,
      valueId: event.id
    }).then((data) => {
      this.data.attributesValue.push(data);
    });
  }

  remove(params: any): void {
    const index = this.data.attributesValue.findIndex((e) => {
      return e.id == params.id;
    });

    if (index >= 0) {
      this.specificationService.deleteAttributeValue(params).then(() => {
        this.data.attributesValue.splice(index, 1);
      });
    }


  }
}
