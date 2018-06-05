import { Pipe, PipeTransform } from '@angular/core';
import { ConstantService } from '../../services/constant/constant.service';

@Pipe({
  name: 'formatCurrency'
})

export class FormatCurrencyPipe implements PipeTransform {

  currencyUnit: any;
  constructor(
    private constant: ConstantService
  ){
    this.currencyUnit = this.constant.getCurrencies();
  }

  transform(val: any): any {
    for(let value of this.currencyUnit) {
      if(value.code == val) {
        return value.currency;
      }
    }

    return '$';
  }

}
