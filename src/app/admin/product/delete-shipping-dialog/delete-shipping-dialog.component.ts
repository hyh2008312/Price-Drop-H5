import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete-shipping-dialog',
  templateUrl: './delete-shipping-dialog.component.html',
  styleUrls: ['../product.scss']
})

export class DeleteShippingDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<DeleteShippingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) {
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  delete() {
    let product = {
      id: this.data.id
    };

    let self = this;
    this.productService.deleteShipping(product).then((data) => {
      self.close();
      self.data.isDelete = true;
    });
  }

}
