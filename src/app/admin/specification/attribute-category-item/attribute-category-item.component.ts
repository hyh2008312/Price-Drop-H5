import { Input, Output, Component, OnInit, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SpecificationService } from '../specification.service';
import { AddCategoryAttributeValueListDialogComponent } from '../add-category-attribute-value-list-dialog/add-category-attribute-value-list-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-attribute-category-item',
  templateUrl: './attribute-category-item.component.html',
  styleUrls: ['../_specification.scss']
})

export class AttributeCategoryItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any;
  @Input() attributeList: any;
  @Input() index: number = 0;
  @Output() productChange = new EventEmitter<any>();

  isEdit: boolean = false;

  attributeForm: FormGroup;

  constructor(
    private adminService: SpecificationService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.attributeForm = this.fb.group({
      id: ['', Validators.required],
      categoryId: ['', Validators.required],
      specificationId: ['', Validators.required],
      sort: ['', Validators.required],
      specificationCount: [false, Validators.required]
    });
  }

  ngOnInit() {

  }

  edit() {
    this.isEdit = true;
    this.attributeForm.patchValue({
      id: this.product.id,
      categoryId: this.product.categoryId,
      specificationId: this.product.specificationId,
      sort: this.product.sort,
      specificationCount: this.product.specificationCount
    });
  }

  save() {
    if(this.attributeForm.invalid) {
      return;
    }
    this.adminService.categoryAttributeSave(this.attributeForm.value).then((data) => {
      this.product = data;
      this.isEdit = false;
      this.productChange.emit({
        index: this.index,
        item: data,
        status: this.status,
        event: 'edit'
      });
    });
  }

  delete() {
    this.adminService.categoryAttributeDelete(this.product).then((data) => {
      this.productChange.emit({
        index: this.index,
        item: data,
        status: this.status,
        event: 'delete'
      });
    });
  }

  add() {

    let attr = [];

    for(let item of this.attributeList) {
      if(item.name == this.product.name) {
        attr = [...item.specificationSpecificationValues];
      }
    }

    let attributesValue = this.product.specificationValues ? this.product.specificationValues.split(',') : [];

    let dialogRef = this.dialog.open(AddCategoryAttributeValueListDialogComponent, {
      data: {
        isAddAttribute: false,
        id: this.product.id,
        name: this.product.name,
        attributesValue,
        attributeValueList: attr
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.product.specificationValues = dialogRef.componentInstance.data.attributesValue.join(',');
    });
  }

}
