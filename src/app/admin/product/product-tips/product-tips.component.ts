import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'app-product-tips',
  template: '{{ data }}',
})
export class ProductTipsComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
