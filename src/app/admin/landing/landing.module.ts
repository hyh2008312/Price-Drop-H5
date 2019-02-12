import { NgModule } from '@angular/core';

import { PromoteMainComponent } from './promote-main/promote-main.component';
import { PromoteTitleComponent } from './promote-title/promote-title.component';
import { PromoteProductTitleComponent } from  './promote-product-title/promote-product-title.component';
import { ProductProductItemComponent } from  './promote-product-item/promote-product-item.component';
import { SelectProductDialogComponent } from  './select-product-dialog/select-product-dialog.component';
import { SelectProductTitleComponent } from  './select-product-title/select-product-title.component';
import { SelectProductItemComponent } from  './select-product-item/select-product-item.component';
import { PaginationComponent } from  './pagination/pagination.component';

import { LandingRoutingModule } from './landing.routes.module';
import { SharedModule } from '../../shared/shared.module';

import { LandingService } from './landing.service';

@NgModule({
  imports: [
    SharedModule,
    LandingRoutingModule
  ],
  exports: [],
  declarations: [
    PromoteMainComponent,
    PromoteTitleComponent,
    PromoteProductTitleComponent,
    ProductProductItemComponent,
    SelectProductDialogComponent,
    SelectProductTitleComponent,
    SelectProductItemComponent,
    PaginationComponent
  ],
  entryComponents: [
    SelectProductDialogComponent
  ],
  providers: [
    LandingService
  ]
})
export class LandingModule { }

