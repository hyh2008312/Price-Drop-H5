import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';

import { TopicService } from '../topic.service';

@Component({
  selector: 'app-promote-promote-item',
  templateUrl: './promote-item.component.html',
  styleUrls: ['../_topic.scss']
})

export class PromoteItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() promote: any = {};
  @Input() index: number = 0;
  @Output() promotionChange = new EventEmitter<any>();

  currency: string = 'USD';

  constructor(
    private promoteService: TopicService
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
    this.promoteService.endPromotion(this.promote).then((data) => {
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

  publish() {
    let self = this;
    let status = 'unpublished';
    switch (this.status) {
      case 1:
        status = 'published';
        break;
    }
    let params = {
      id: this.promote.id,
      status: status
    };
    this.promoteService.publishPromotion(params).then((data) => {
      self.promotionChange.emit({
        index: this.index,
        promote : data,
        status: this.status,
        event: 'delete'
      });
    });
  }

}
