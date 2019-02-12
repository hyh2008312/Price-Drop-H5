import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';

import { TopicService } from '../topic.service';

@Component({
  selector: 'app-promote-change-variant-item',
  templateUrl: './product-variant-item.component.html',
  styleUrls: ['../_topic.scss']
})

export class ProductVariantItemComponent implements OnInit {

  @Input() variant: any={};
  @Input() variantLength: any;
  @Input() index: any = 0;
  @Output() variantChange = new EventEmitter<any>();

  isEdit:boolean = false;

  currency: string = 'USD';

  constructor(
    private promoteService: TopicService
  ) { }

  ngOnInit(): void {

  }

  delete() {
    let param: any = {
      id: this.variant.id
    };

    let self = this;
    this.promoteService.deletePromotionProductVariant(param).then((data) => {
      self.variantLength--;
      self.variantChange.emit({
        event: 'delete',
        index: self.index,
        data: data
      });
    });
  }

  edit() {
    this.isEdit = !this.isEdit;
  }

  save() {
    let param: any = this.variant;

    let self = this;
    this.promoteService.changePromotionProductVariant(param).then((data) => {
      self.isEdit = false;
      self.variantChange.emit({
        event: 'edit',
        index: self.index,
        data: data
      });
    });
  }

  changeStock($event) {
    if($event < this.variant.orderNum) {
      $event = this.variant.orderNum;
    } else if($event > this.variant.stock + this.variant.totalStock) {
      $event = this.variant.stock + this.variant.totalStock;
    }
    let lastStock = this.variant.stock;
    if(lastStock != $event) {
      this.variant.totalStock = this.variant.totalStock - ($event - lastStock);
    }
    this.variant.stock = $event;
  }

}
