import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';

import { PromoteService } from '../promote.service';

@Component({
  selector: 'app-promote-select-product-item',
  templateUrl: './select-product-item.component.html',
  styleUrls: ['../_promote.scss']
})

export class SelectProductItemComponent implements OnInit {

  @Input() promote: any={};
  @Input() index: any = 0;
  @Input() promoteId: any;
  @Output() promoteChange = new EventEmitter<any>();

  currency: string = 'USD';

  constructor(
    private promoteService: PromoteService
  ) { }

  ngOnInit(): void {

  }

  selectPromotionProduct() {
    let params: any ={};
    params.promoteId = this.promoteId;
    params.pid = this.promote.id;

    this.promoteService.addPromotionProduct(params).then(((data) => {
      this.promote = data;
      this.promoteChange.emit({
        index: this.index,
        promote : data,
        event: 'changed'
      });
    }));
  }

}
