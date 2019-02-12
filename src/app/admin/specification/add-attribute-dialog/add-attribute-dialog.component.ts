import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { SpecificationService } from '../specification.service';

@Component({
  selector: 'app-specification-add-attribute-dialog',
  templateUrl: './add-attribute-dialog.component.html',
  styleUrls: ['../_specification.scss']
})

export class AddAttributeDialogComponent implements OnInit {

  attributeForm : FormGroup;
  error: any = false;

  constructor(
    public dialogRef: MatDialogRef<AddAttributeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private specificationService: SpecificationService
  ) {
    this.attributeForm = this.fb.group({
      name: ['', Validators.required],
      chineseName: ['', Validators.required]
    });

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
      } else {
        self.error = 'Duplicate Attribute!';
      }
    }).catch(() => {
      self.error = 'Duplicate Attribute!';
    });
  }
}
