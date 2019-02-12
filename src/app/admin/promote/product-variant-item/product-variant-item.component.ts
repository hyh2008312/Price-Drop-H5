import { Input, Output, Component, OnInit, EventEmitter} from '@angular/core';

import { PromoteService } from '../promote.service';

@Component({
  selector: 'app-promote-change-variant-item',
  templateUrl: './product-variant-item.component.html',
  styleUrls: ['../_promote.scss']
})

export class ProductVariantItemComponent implements OnInit {

  @Input() variant: any={};
  @Input() variantLength: any;
  @Input() promotionId: any;
  @Input() index: any = 0;
  @Output() variantChange = new EventEmitter<any>();

  isEdit:boolean = false;

  currency: string = 'USD';

  constructor(
    private promoteService: PromoteService
  ) {}

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
    this.promoteService.changePromotionProductVariant({
      id: this.variant.id,
      stockAvailable: this.variant.stock,
      promotionId: this.promotionId
    }).then((data) => {
      self.variant = data;
      self.isEdit = false;
      self.variantChange.emit({
        event: 'edit',
        index: self.index,
        data: data
      });
    });
  }

  changeStock($event) {
    if($event > this.variant.productVariantStock - this.variant.productVariantStockLocked + this.variant.stock) {
      $event = this.variant.productVariantStock - this.variant.productVariantStockLocked + this.variant.stock;
    } else if($event < this.variant.stockLocked) {
      $event = this.variant.stockLocked;
    }
    this.variant.productVariantStockLocked = parseInt(this.variant.productVariantStockLocked) + parseInt($event) - parseInt(this.variant.stock);
    this.variant.stock = $event;
  }

}
