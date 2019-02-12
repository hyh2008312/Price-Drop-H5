import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';

import { LotteryService } from '../lottery.service';

@Component({
  selector: 'app-lottery-select-product-item',
  templateUrl: './select-product-item.component.html',
  styleUrls: ['../_lottery.scss']
})

export class SelectProductItemComponent implements OnInit {

  @Input() promote: any={};
  @Input() index: any = 0;
  @Input() promoteId: any;
  @Output() promoteChange = new EventEmitter<any>();

  currency: string = 'USD';

  constructor(
    private promoteService: LotteryService
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
