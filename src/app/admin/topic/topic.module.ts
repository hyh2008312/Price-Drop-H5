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
import { AddTabDialogComponent } from  './add-tab-dialog/add-tab-dialog.component';
import { TopicCreateOneComponent } from './topic-create-template/topic-create-1/topic-create-1.component';
import { TopicCreateTwoComponent } from './topic-create-template/topic-create-2/topic-create-2.component';
import { TopicEditOneComponent } from './topic-edit-template/topic-edit-1/topic-edit-1.component';
import { TopicEditTwoComponent } from './topic-edit-template/topic-edit-2/topic-edit-2.component';
import { ImageUploadAdditionalComponent } from './image-upload-additional/image-upload-additional.component';

import { ImageUploadMainComponent } from './image-upload-main/image-upload-main.component'

import { TopicRoutingModule } from './topic.routes.module';
import { SharedModule } from '../../shared/shared.module';

import { TopicService } from './topic.service';

@NgModule({
  imports: [
    SharedModule,
    TopicRoutingModule
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
    ProductVariantTitleComponent,
    ImageUploadMainComponent,
    TopicCreateOneComponent,
    AddTabDialogComponent,
    TopicEditOneComponent,
    TopicCreateTwoComponent,
    TopicEditTwoComponent,
    ImageUploadAdditionalComponent
  ],
  entryComponents: [
    SelectProductDialogComponent,
    ChangeVariantDialogComponent,
    AddTabDialogComponent
  ],
  providers: [
    TopicService
  ]
})
export class TopicModule { }

