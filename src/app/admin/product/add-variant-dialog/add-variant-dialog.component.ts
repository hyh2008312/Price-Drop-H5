import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-add-variant-dialog',
  templateUrl: './add-variant-dialog.component.html',
  styleUrls: ['../product.scss']
})

export class AddVariantDialogComponent implements OnInit {

  variantForm: FormGroup;
  get attributes() { return this.variantForm.get('attributes') as FormArray; }
  image: any='';

  attributeList = [{
    id: 1,
    name: 'color'
  }, {
    id: 2,
    name: 'size'
  }];

  constructor(
    public dialogRef: MatDialogRef<AddVariantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private fb: FormBuilder
  ) {

    this.variantForm = this.fb.group({
      saleUnitPrice: [1, Validators.required],
      unitPrice: [1, Validators.required],
      costPrice: [1, Validators.required],
      lowestPrice: [0, Validators.required],
      sourcingPrice: [1],
      productId: [this.data.productId, Validators.required],
      stock: [100000, Validators.required],
      attributes: this.fb.array([])
    });

    for(let item of this.data.attributes) {
      this.attributes.push(this.fb.group({
        id: [item.id, Validators.required],
        name: [item.name, Validators.required],
        value: ['', Validators.required],
        images: ['']
      }));
    }

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  addVariantImage($event) {
    this.image = $event.file;
  }

  add() {
    if(this.variantForm.invalid) {
      return;
    }

    let product = this.variantForm.value;
    product.mainImage = this.image;
    let self = this;
    this.productService.addNewVariant(product).then((data) => {
      self.data.isVariantAdded = true;
      self.data.variant = data;
      self.close();
    });
  }

}
