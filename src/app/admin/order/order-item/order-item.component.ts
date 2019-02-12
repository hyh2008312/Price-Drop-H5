import { Input, Output, Component, OnInit, EventEmitter} from '@angular/core';

import { OrderService } from '../order.service';
import { ApproveCancelDialogComponent } from '../approve-cancel-dialog/approve-cancel-dialog.component';
import { AddNoteDialogComponent } from '../add-note-dialog/add-note-dialog.component';
import { AddOrderStockDialogComponent } from '../add-order-stock-dialog/add-order-stock-dialog.component';
import { MatDialog } from '@angular/material';

import { UserService } from  '../../../shared/services/user/user.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['../order.scss']
})

export class OrderItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() order: any;
  @Input() index: number = 0;
  @Output() productChange = new EventEmitter<any>();

  currency: string = 'INR';
  isSuperuser: any = false;

  constructor(
    private adminService: OrderService,
    private dialog: MatDialog,
    private userService: UserService
  ) {
    this.userService.currentUser.subscribe((data) => {
      if(data) {
        if(data.isStaff && data.isSuperuser) {
          this.isSuperuser = true
        }
      }
    });
  }

  ngOnInit(): void {

  }

  editSourcing() {
    let dialogRef = this.dialog.open(AddOrderStockDialogComponent, {
      data: {
        order: this.order,
        isOrderStockEdit: false
      }
    });

    let self = this;

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isOrderStockEdit == true) {
        self.order = dialogRef.componentInstance.data.order;
      }
    });
  }

  approveCancel() {
    let dialogRef = this.dialog.open(ApproveCancelDialogComponent, {
      data: {
        order: this.order,
        isOrderCancel: false
      }
    });

    let self = this;

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isOrderCancel == true) {
        self.productChange.emit({
          index: self.index,
          status: self.status,
          order: self.order,
          event: 'audit'
        });
      }
    });
  }

  addNote() {
    let dialogRef = this.dialog.open(AddNoteDialogComponent, {
      data: {
        order: this.order,
        isNoteAdd: false
      }
    });

    let self = this;

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isNoteAdd == true) {
        self.order = dialogRef.componentInstance.data.order;
      }
    });
  }
}
