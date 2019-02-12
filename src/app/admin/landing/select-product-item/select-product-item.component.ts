import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';

import { LandingService } from '../landing.service';

@Component({
  selector: 'app-promote-select-product-item',
  templateUrl: './select-product-item.component.html',
  styleUrls: ['../_landing.scss']
})

export class SelectProductItemComponent implements OnInit {

  @Input() promote: any={};
  @Input() index: any = 0;
  @Input() categoryId: any;
  @Output() promoteChange = new EventEmitter<any>();

  currency: string = 'INR';
  error: any = false;

  constructor(
    private promoteService: LandingService
  ) { }

  ngOnInit(): void {

  }

  selectPromotionProduct() {
    let params: any ={};
    params.productId = this.promote.id;
    params.categoryId = this.categoryId;

    this.promoteService.addPromotionProduct(params).then(((data) => {

      if(data && data.id) {
        this.promote = data;
        this.promoteChange.emit({
          index: this.index,
          promote : data,
          event: 'changed'
        });
      } else {
        this.promoteChange.emit({
          index: this.index,
          promote: data.detail,
          event: 'error'
        });
      }

    })).catch((data) => {
      this.promoteChange.emit({
        index: this.index,
        promote: data,
        event: 'error'
      });
    });
  }

  countOff (s, o) {
    if (o > 0) {
      return Math.floor((o - s) / o * 100) + '% OFF'
    } else {
      return ''
    }
  }

}
