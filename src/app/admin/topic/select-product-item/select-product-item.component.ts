import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';

import { TopicService } from '../topic.service';

@Component({
  selector: 'app-promote-select-product-item',
  templateUrl: './select-product-item.component.html',
  styleUrls: ['../_topic.scss']
})

export class SelectProductItemComponent implements OnInit {

  @Input() promote: any={};
  @Input() index: any = 0;
  @Input() promoteId: any;
  @Output() promoteChange = new EventEmitter<any>();

  currency: string = 'INR';

  constructor(
    private promoteService: TopicService
  ) { }

  ngOnInit(): void {

  }

  selectPromotionProduct() {
    let params: any ={};
    params.tabId = this.promoteId;
    params.productId = this.promote.id;

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
