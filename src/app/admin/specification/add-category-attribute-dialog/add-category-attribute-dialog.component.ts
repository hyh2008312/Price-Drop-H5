import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { SpecificationService } from '../specification.service';

@Component({
  selector: 'app-specification-add-category-attribute-dialog',
  templateUrl: './add-category-attribute-dialog.component.html',
  styleUrls: ['../_specification.scss']
})

export class AddCategoryAttributeDialogComponent implements OnInit {

  attributeForm : FormGroup;

  attributeList: any;

  selectable = true;
  removable = true;

  valueList: any = [];

  attributesValue: any = [];

  constructor(
    public dialogRef: MatDialogRef<AddCategoryAttributeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private specificationService: SpecificationService
  ) {
    this.attributeForm = this.fb.group({
      categoryId: ['', Validators.required],
      specificationId: ['', Validators.required],
      sort: ['', Validators.required],
      specificationCount: [1, Validators.required]
    });

    this.attributeForm.patchValue({
      categoryId: this.data.id
    });

    this.attributeList = this.data.attributeList;

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
    this.specificationService.categoryAttributeCreate(this.attributeForm.value).then((data) => {
      if(data.id) {
        let specificationValues = '';
        for(let item of this.attributeList) {
          if(item.name == data.name) {
            for(let i = 0;i < item.specificationSpecificationValues.length; i++) {
              const em = item.specificationSpecificationValues[i];
              if(i == 0) {
                specificationValues += em.specificationValueContent;
              } else {
                specificationValues += ',' + em.specificationValueContent;
              }
            }

          }
        }
        this.specificationService.addCategoryAttributeValue({
          id: data.id,
          specificationValues
        }).then((data) => {
          self.close();
          self.data.isAddAttribute = true;
        });
      }
    });
  }

  add(event): void {
    this.attributesValue.push(event);
    this.attributeForm.patchValue({
      attributesValue: this.attributesValue
    });
  }

  remove(params: any): void {
    const index = this.attributesValue.indexOf(params);

    if (index >= 0) {
      this.attributesValue.splice(index, 1);
    }

    this.attributeForm.patchValue({
      attributesValue: this.attributesValue
    });
  }

}
