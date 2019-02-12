import { NgModule } from '@angular/core';

import { ReviewComponent } from './review-main/review-main.component';
import { ReviewTitleComponent } from './review-title/review-title.component';
import { ReviewItemComponent } from './review-item/review-item.component';
import { ReviewImageDialogComponent } from './review-image-dialog/review-image-dialog.component';

import { SizeChartRoutingModule } from './review.routes.module';
import { SharedModule } from '../../shared/shared.module';

import { ReviewService } from './review.service';

@NgModule({
  imports: [
    SharedModule,
    SizeChartRoutingModule
  ],
  exports: [],
  declarations: [
    ReviewComponent,
    ReviewTitleComponent,
    ReviewItemComponent,
    ReviewImageDialogComponent
  ],
  entryComponents: [
    ReviewImageDialogComponent
  ],
  providers: [
    ReviewService
  ]
})
export class ReviewModule { }

