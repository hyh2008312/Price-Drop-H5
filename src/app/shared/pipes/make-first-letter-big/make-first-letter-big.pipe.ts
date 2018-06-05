import {Pipe, PipeTransform} from '@angular/core';
import {ConstantService} from '../../services/constant/constant.service'

@Pipe({name: 'makeFirstLetterBig'})
export class MakeFirstLetterBigPipe implements PipeTransform {
  constructor() {
  }

  transform(str: any): any {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
  }
}
