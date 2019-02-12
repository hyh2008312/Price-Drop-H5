import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';

import { LotteryService } from '../lottery.service';

@Component({
  selector: 'app-lottery-promote-item',
  templateUrl: './promote-item.component.html',
  styleUrls: ['../_lottery.scss']
})

export class PromoteItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() promote: any = {};
  @Input() index: number = 0;
  @Output() promotionChange = new EventEmitter<any>();

  currency: string = 'USD';

  constructor(
    private promoteService: LotteryService
  ) { }

  ngOnInit(): void {

  }

  delete() {
    let self = this;
    let param = {
      id: this.promote.id,
      isShow: true
    };

    this.promoteService.deletePromotion(param).then((data) => {

      self.promotionChange.emit({
        index: this.index,
        promote : data,
        status: this.status,
        event: 'delete'
      });
    });
  }

}
