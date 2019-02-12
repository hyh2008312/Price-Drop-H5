import { NgModule } from '@angular/core';

import { InventoryMainComponent } from './inventory-main/inventory-main.component';

import { InventoryItemComponent } from './inventory-item/inventory-item.component';
import { InventoryTitleComponent } from './inventory-title/inventory-title.component';
import { InventoryTitleFixedComponent } from './inventory-title-fixed/inventory-title-fixed.component';
import { InventoryImageDialogComponent } from './inventory-image-dialog/inventory-image-dialog.component';
import { ToolTipsComponent } from './tool-tips/tool-tips.component';

import { InventoryRoutingModule } from './inventory.routes.module';
import { SharedModule } from '../../shared/shared.module';

import { InventoryService } from './inventory.service';

@NgModule({
  imports: [
    SharedModule,
    InventoryRoutingModule
  ],
  exports: [],
  declarations: [
    InventoryMainComponent,
    InventoryItemComponent,
    InventoryTitleComponent,
    InventoryImageDialogComponent,
    ToolTipsComponent,
    InventoryTitleFixedComponent
  ],
  entryComponents: [
    InventoryImageDialogComponent,
    ToolTipsComponent
  ],
  providers: [
    InventoryService
  ]
})
export class InventoryModule { }

