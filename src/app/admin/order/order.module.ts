import { NgModule } from '@angular/core';

import { OrderMainComponent } from './order-main/order-main.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderReturnDetailComponent } from './order-return-detail/order-return-detail.component';

import { OrderItemComponent } from './order-item/order-item.component';
import { OrderTitleComponent } from './order-title/order-title.component';
import { OrderDetailItemComponent } from './order-detail-item/order-detail-item.component';
import { OrderDetailTitleComponent } from './order-detail-title/order-detail-title.component';
import { OrderDetailTrackingItemComponent } from './order-detail-tracking-item/order-detail-tracking-item.component';
import { AddTrackingInformationDialogComponent } from './add-tracking-information-dialog/add-tracking-information-dialog.component';
import { CancelOrderDialogComponent } from './cancel-order-dialog/cancel-order-dialog.component';
import { CancelFulfillmentDialogComponent } from './cancel-fulfillment-dialog/cancel-fulfillment-dialog.component';
import { DenyRequestDialogComponent } from './deny-request-dialog/deny-request-dialog.component';
import { AuthorizeReturnDialogComponent } from './authorize-return-dialog/authorize-return-dialog.component';
import { ShipExchangeItemDialogComponent } from './ship-exchange-item-dialog/ship-exchange-item-dialog.component';
import { IssueRefundDialogComponent } from './issue-refund-dialog/issue-refund-dialog.component';
import { ApproveCancelDialogComponent } from './approve-cancel-dialog/approve-cancel-dialog.component';
import { AddGatiPostDialogComponent } from './add-gati-post-dialog/add-gati-post-dialog.component';
import { AddOrderStockDialogComponent } from './add-order-stock-dialog/add-order-stock-dialog.component';
import { AddNoteDialogComponent } from './add-note-dialog/add-note-dialog.component';

import { OrderService } from './order.service';

import { OrderRoutingModule } from './order.routes.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    OrderRoutingModule
  ],
  exports: [],
  declarations: [
    OrderMainComponent,
    OrderDetailComponent,
    OrderReturnDetailComponent,
    OrderItemComponent,
    OrderTitleComponent,
    OrderDetailItemComponent,
    OrderDetailTitleComponent,
    OrderDetailTrackingItemComponent,
    AddTrackingInformationDialogComponent,
    CancelOrderDialogComponent,
    CancelFulfillmentDialogComponent,
    DenyRequestDialogComponent,
    AuthorizeReturnDialogComponent,
    ShipExchangeItemDialogComponent,
    IssueRefundDialogComponent,
    ApproveCancelDialogComponent,
    AddGatiPostDialogComponent,
    AddOrderStockDialogComponent,
    AddNoteDialogComponent
  ],
  entryComponents: [
    AddTrackingInformationDialogComponent,
    CancelOrderDialogComponent,
    CancelFulfillmentDialogComponent,
    DenyRequestDialogComponent,
    AuthorizeReturnDialogComponent,
    ShipExchangeItemDialogComponent,
    IssueRefundDialogComponent,
    ApproveCancelDialogComponent,
    AddGatiPostDialogComponent,
    AddOrderStockDialogComponent,
    AddNoteDialogComponent
  ],
  providers: [
    OrderService
  ]
})
export class OrderModule { }

