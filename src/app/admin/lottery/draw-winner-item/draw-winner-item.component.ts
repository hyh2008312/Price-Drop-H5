import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';

import { LotteryService } from '../lottery.service';
import {AddTrackingInformationDialogComponent} from '../add-tracking-information-dialog/add-tracking-information-dialog.component';
import {MatDialog} from '@angular/material';
import {AddOrderStockDialogComponent} from '../add-order-stock-dialog/add-order-stock-dialog.component';
import {AddNoteDialogComponent} from '../add-note-dialog/add-note-dialog.component';

@Component({
  selector: 'app-lottery-draw-winner-item',
  templateUrl: './draw-winner-item.component.html',
  styleUrls: ['../_lottery.scss']
})

export class DrawWinnerItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() promote: any = {};
  @Input() promoteId: any;
  @Input() index: number = 0;
  @Output() promotionChange = new EventEmitter<any>();

  currency: string = 'USD';
  isShippingNumberEdit: boolean = false;

  constructor(
    private promoteService: LotteryService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

  editTracking() {
    let dialogRef = this.dialog.open(AddTrackingInformationDialogComponent, {
      data: {
        order: this.promote.order,
        isShippingNumberEdit: this.isShippingNumberEdit
      }
    });

    let self = this;

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isShippingNumberEdit == true) {
        this.promote.order = dialogRef.componentInstance.data.order;
      }
    });
  }


  editSourcing() {
    let dialogRef = this.dialog.open(AddOrderStockDialogComponent, {
      data: {
        order: this.promote.order,
        isOrderStockEdit: false
      }
    });

    let self = this;

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isOrderStockEdit == true) {
        self.promote.order = dialogRef.componentInstance.data.order;
      }
    });
  }

  addNote() {
    let dialogRef = this.dialog.open(AddNoteDialogComponent, {
      data: {
        order: this.promote.order,
        isNoteAdd: false
      }
    });

    let self = this;

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isNoteAdd == true) {
        self.promote.order = dialogRef.componentInstance.data.order;
      }
    });
  }

}
