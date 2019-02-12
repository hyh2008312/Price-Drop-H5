import { NgModule } from '@angular/core';

import { LotteryMainComponent } from './lottery-main/lottery-main.component';
import { LotteryAwardCreateComponent } from './lottery-award-create/lottery-award-create.component';
import { LotteryAwardEditComponent } from './lottery-award-edit/lottery-award-edit.component';
import { ImageUploadAdditionalComponent } from './image-upload-additional/image-upload-additional.component';
import { ImageUploadColorComponent } from './image-upload-color/image-upload-color.component';
import { AwardTitleComponent } from './award-title/award-title.component';
import { AwardItemComponent } from './award-item/award-item.component';
import { PromoteItemComponent } from './promote-item/promote-item.component';
import { PromoteTitleComponent } from './promote-title/promote-title.component';
import { PromoteCreateComponent } from './promote-create/promote-create.component';
import { PromoteEditComponent } from './promote-edit/promote-edit.component';
import { SelectProductDialogComponent } from './select-product-dialog/select-product-dialog.component';
import { SelectProductTitleComponent } from './select-product-title/select-product-title.component';
import { SelectProductItemComponent } from './select-product-item/select-product-item.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DrawParticipantTitleComponent } from './draw-participant-title/draw-participant-title.component';
import { DrawParticipantItemComponent } from './draw-participant-item/draw-participant-item.component';
import { DrawWinnerTitleComponent } from './draw-winner-title/draw-winner-title.component';
import { DrawWinnerItemComponent } from './draw-winner-item/draw-winner-item.component';
import { AddTrackingInformationDialogComponent } from './add-tracking-information-dialog/add-tracking-information-dialog.component';
import { OrderDetailTitleComponent } from './order-detail-title/order-detail-title.component';
import { OrderDetailItemComponent } from './order-detail-item/order-detail-item.component';
import { ToolTipsComponent } from './tool-tips/tool-tips.component';

import { AddOrderStockDialogComponent } from './add-order-stock-dialog/add-order-stock-dialog.component';
import { AddNoteDialogComponent } from './add-note-dialog/add-note-dialog.component';

import { LotteryRoutingModule } from './lottery.routes.module';
import { SharedModule } from '../../shared/shared.module';

import { LotteryService } from './lottery.service';

@NgModule({
  imports: [
    SharedModule,
    LotteryRoutingModule
  ],
  exports: [],
  declarations: [
    LotteryMainComponent,
    LotteryAwardCreateComponent,
    LotteryAwardEditComponent,
    ImageUploadAdditionalComponent,
    ImageUploadColorComponent,
    AwardTitleComponent,
    AwardItemComponent,
    PromoteItemComponent,
    PromoteTitleComponent,
    PromoteCreateComponent,
    SelectProductDialogComponent,
    SelectProductTitleComponent,
    SelectProductItemComponent,
    PaginationComponent,
    PromoteEditComponent,
    DrawParticipantTitleComponent,
    DrawParticipantItemComponent,
    DrawWinnerTitleComponent,
    DrawWinnerItemComponent,
    AddTrackingInformationDialogComponent,
    OrderDetailTitleComponent,
    OrderDetailItemComponent,
    ToolTipsComponent,
    AddOrderStockDialogComponent,
    AddNoteDialogComponent
  ],
  entryComponents: [
    SelectProductDialogComponent,
    AddTrackingInformationDialogComponent,
    ToolTipsComponent,
    AddOrderStockDialogComponent,
    AddNoteDialogComponent
  ],
  providers: [
    LotteryService
  ]
})
export class LotteryModule { }

