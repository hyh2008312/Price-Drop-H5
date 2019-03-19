import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'saleDiscount'
})
export class SaleDiscountPipe implements PipeTransform {

  constructor(){}
  transform(value: any, originalPrice: any): any {
    if(value > 0 && originalPrice >0) {
      return Math.ceil((originalPrice - value) * 100 / originalPrice) + '%';
    } else if(originalPrice > 0 && (!value || value <= 0)) {
      return '0';
    } else if(value > 0 && (!originalPrice || originalPrice <= 0)) {
      return '0';
    }
  }

}
