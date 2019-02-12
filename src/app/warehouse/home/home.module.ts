import { NgModule } from '@angular/core';

import { HomeMainComponent } from './home-main/home-main.component';
import { HomeCreateDialogComponent } from './home-create-dialog/home-create-dialog.component';

import { HomeItemComponent } from './home-item/home-item.component';
import { HomeTitleComponent } from './home-title/home-title.component';
import { HomeTitleFixedComponent } from './home-title-fixed/home-title-fixed.component';

import { OrderTrackingDialogComponent } from './order-tracking-dialog/order-tracking-dialog.component';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { HomeEditDialogComponent } from './home-edit-dialog/home-edit-dialog.component';
import { HomeCompleteDialogComponent } from './home-complete-dialog/home-complete-dialog.component';
import { HomeWrongDialogComponent } from './home-wrong-dialog/home-wrong-dialog.component';
import { HomeImageDialogComponent } from './home-image-dialog/home-image-dialog.component';
import { ToolTipsComponent } from './tool-tips/tool-tips.component';
import { AddAttentionDialogComponent } from './add-attention-dialog/add-attention-dialog.component';
import { AddTrackingDialogComponent } from './add-tracking-dialog/add-tracking-dialog.component';

import { HomeRoutingModule } from './home.routes.module';
import { SharedModule } from '../../shared/shared.module';

import { HomeService } from './home.service';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  exports: [],
  declarations: [
    HomeMainComponent,
    HomeCreateDialogComponent,
    HomeItemComponent,
    HomeTitleComponent,
    OrderTrackingDialogComponent,
    OrderDetailDialogComponent,
    HomeEditDialogComponent,
    HomeCompleteDialogComponent,
    HomeImageDialogComponent,
    ToolTipsComponent,
    AddAttentionDialogComponent,
    HomeWrongDialogComponent,
    HomeTitleFixedComponent,
    AddTrackingDialogComponent
  ],
  entryComponents: [
    HomeCreateDialogComponent,
    OrderTrackingDialogComponent,
    OrderDetailDialogComponent,
    HomeEditDialogComponent,
    HomeCompleteDialogComponent,
    HomeImageDialogComponent,
    ToolTipsComponent,
    AddAttentionDialogComponent,
    HomeWrongDialogComponent,
    AddTrackingDialogComponent
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }

