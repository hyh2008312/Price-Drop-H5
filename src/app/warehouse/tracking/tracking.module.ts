import { NgModule } from '@angular/core';

import { TrackingMainComponent } from './tracking-main/tracking-main.component';
import { TrackingCreateDialogComponent } from './tracking-create-dialog/tracking-create-dialog.component';

import { TrackingItemComponent } from './tracking-item/tracking-item.component';
import { TrackingTitleComponent } from './tracking-title/tracking-title.component';
import { TrackingTitleFixedComponent } from './tracking-title-fixed/tracking-title-fixed.component';

import { TrackingEditDialogComponent } from './tracking-edit-dialog/tracking-edit-dialog.component';
import { TrackingImageDialogComponent } from './tracking-image-dialog/tracking-image-dialog.component';
import { AddNotesDialogComponent } from './add-notes-dialog/add-notes-dialog.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { ConfirmPackageDialogComponent } from './confirm-package-dialog/confirm-package-dialog.component';
import { ConfirmNotFoundDialogComponent } from './confirm-not-found-dialog/confirm-not-found-dialog.component';
import { ToolTipsComponent } from './tool-tips/tool-tips.component';

import { TrackingRoutingModule } from './tracking.routes.module';
import { SharedModule } from '../../shared/shared.module';

import { TrackingService } from './tracking.service';

@NgModule({
  imports: [
    SharedModule,
    TrackingRoutingModule
  ],
  exports: [],
  declarations: [
    TrackingMainComponent,
    TrackingCreateDialogComponent,
    TrackingItemComponent,
    TrackingTitleComponent,
    TrackingEditDialogComponent,
    TrackingImageDialogComponent,
    ToolTipsComponent,
    AddNotesDialogComponent,
    ConfirmDeleteDialogComponent,
    ConfirmPackageDialogComponent,
    ConfirmNotFoundDialogComponent,
    TrackingTitleFixedComponent
  ],
  entryComponents: [
    TrackingCreateDialogComponent,
    TrackingEditDialogComponent,
    TrackingImageDialogComponent,
    ToolTipsComponent,
    AddNotesDialogComponent,
    ConfirmDeleteDialogComponent,
    ConfirmPackageDialogComponent,
    ConfirmNotFoundDialogComponent
  ],
  providers: [
    TrackingService
  ]
})
export class TrackingModule { }

