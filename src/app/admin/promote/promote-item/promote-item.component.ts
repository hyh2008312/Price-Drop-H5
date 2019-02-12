import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';

import { PromoteService } from '../promote.service';

@Component({
  selector: 'app-promote-promote-item',
  templateUrl: './promote-item.component.html',
  styleUrls: ['../_promote.scss']
})

export class PromoteItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() promote: any = {};
  @Input() index: number = 0;
  @Output() promotionChange = new EventEmitter<any>();

  currency: string = 'USD';

  constructor(
    private promoteService: PromoteService
  ) { }

  ngOnInit(): void {

  }

  delete() {
    let self = this;
    this.promoteService.deletePromotion(this.promote).then((data) => {

      self.promotionChange.emit({
        index: this.index,
        promote : data,
        status: this.status,
        event: 'delete'
      });
    });
  }

  disable() {
    let self = this;
    this.promoteService.endPromotion({
      id: this.promote.id,
      status: 'Ended'
    }).then((data) => {
      if(self.status > 0) {
        self.promotionChange.emit({
          index: this.index,
          promote : data,
          status: this.status,
          event: 'delete'
        });
      } else {
        self.promote = data;
      }
    });
  }

}
