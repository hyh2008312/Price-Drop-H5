import { NgModule } from '@angular/core';

import { PromoteMainComponent } from './promote-main/promote-main.component';
import { PromoteCreateComponent } from './promote-create/promote-create.component';
import { PromoteEditComponent } from './promote-edit/promote-edit.component';

import { PromoteItemComponent } from './promote-item/promote-item.component';
import { PromoteTitleComponent } from './promote-title/promote-title.component';
import { PromoteProductTitleComponent } from  './promote-product-title/promote-product-title.component';
import { ProductProductItemComponent } from  './promote-product-item/promote-product-item.component';
import { SelectProductDialogComponent } from  './select-product-dialog/select-product-dialog.component';
import { SelectProductTitleComponent } from  './select-product-title/select-product-title.component';
import { SelectProductItemComponent } from  './select-product-item/select-product-item.component';
import { PaginationComponent } from  './pagination/pagination.component';
import { ChangeVariantDialogComponent } from  './change-variant-dialog/change-variant-dialog.component';
import { ProductVariantItemComponent } from './product-variant-item/product-variant-item.component';
import { ProductVariantTitleComponent } from './product-variant-title/product-variant-title.component';

import { PromoteRoutingModule } from './promote.routes.module';
import { SharedModule } from '../../shared/shared.module';

import { PromoteService } from './promote.service';

@NgModule({
  imports: [
    SharedModule,
    PromoteRoutingModule
  ],
  exports: [],
  declarations: [
    PromoteMainComponent,
    PromoteItemComponent,
    PromoteTitleComponent,
    PromoteCreateComponent,
    PromoteProductTitleComponent,
    ProductProductItemComponent,
    SelectProductDialogComponent,
    SelectProductTitleComponent,
    SelectProductItemComponent,
    PaginationComponent,
    PromoteEditComponent,
    ChangeVariantDialogComponent,
    ProductVariantItemComponent,
    ProductVariantTitleComponent
  ],
  entryComponents: [
    SelectProductDialogComponent,
    ChangeVariantDialogComponent
  ],
  providers: [
    PromoteService
  ]
})
export class PromoteModule { }

