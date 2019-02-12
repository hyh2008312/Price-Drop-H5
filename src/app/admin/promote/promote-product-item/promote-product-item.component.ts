import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material';

import { PromoteService } from '../promote.service';
import {ChangeVariantDialogComponent} from '../change-variant-dialog/change-variant-dialog.component';

@Component({
  selector: 'app-promote-product-item',
  templateUrl: './promote-product-item.component.html',
  styleUrls: ['../_promote.scss']
})

export class ProductProductItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() promote: any={};
  @Input() promoteId: any;
  @Input() index: number = 0;
  @Output() promotionChange = new EventEmitter<any>();

  isEdit: boolean = false;

  currency: string = 'INR';

  constructor(
    private dialog: MatDialog,
    private promoteService: PromoteService
  ) { }

  ngOnInit(): void {

  }

  get price() {
    if(this.promote.discount <= 100 &&  this.promote.discount > 0) {
      return this.promote.unitPrice * this.promote.discount / 100;
    } else {
      return this.promote.unitPrice;
    }
  }

  get discount() {
    return Math.ceil((this.promote.saleUnitPrice - this.price) / this.promote.saleUnitPrice * 100) + '% OFF';
  }

  delete() {
    let self = this;
    this.promoteService.deletePromotionProduct({
      id: this.promote.id
    }).then((data) => {
      this.promotionChange.emit({
        index: self.index,
        event: 'delete',
        promote: data
      });
    });
  }

  edit() {
    this.isEdit = !this.isEdit;
  }

  save() {
    let self = this;
    let params:any = this.promote;
    this.promoteService.savePromotionProduct(params).then((data) => {
      self.isEdit = false;
      self.promote = data
    });
  }

  variantPromotions() {
    let dialogRef = this.dialog.open(ChangeVariantDialogComponent, {
      data: {
        title: this.promote.title,
        promotionId: this.promoteId,
        productId: this.promote.id,
        isEdit: false
      }
    });

    let self = this;

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isEdit == true) {
        self.promoteService.getPromotionDetail({
          id: this.promoteId
        }).then((data) => {

          self.promote = data.product[self.index];

        });
      }
    });
  }

  changeDiscount($event) {
    this.promote.discount = $event;
    this.promotionChange.emit({
      index: this.index,
      event: 'discount',
      promote: this.promote
    });
  }
}
