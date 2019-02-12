 import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { SpecificationService } from '../specification.service';

@Component({
  selector: 'app-specification-add-attribute-value-dialog',
  templateUrl: './add-attribute-value-dialog.component.html',
  styleUrls: ['../_specification.scss']
})

export class AddAttributeValueDialogComponent implements OnInit {

  attributeForm : FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddAttributeValueDialogComponent>,
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
    this.specificationService.attributeValueCreate(this.attributeForm.value).then((data) => {
      if(data.id) {
        self.close();
        self.data.isAddAttribute = true;
      }
    });
  }

}
