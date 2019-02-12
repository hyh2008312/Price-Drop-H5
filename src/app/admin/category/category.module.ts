import { NgModule } from '@angular/core';

import { CategoryMainComponent } from './category-main/category-main.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryTitleComponent } from './category-title/category-title.component';
import { CategoryItemComponent } from './category-item/category-item.component';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { ImageUploadCategoryComponent } from './image-upload-category/image-upload-category.component';
import { ToolTipsComponent } from './tool-tips/tool-tips.component';

import { CategoryRoutingModule } from './category.routes.module';
import { SharedModule } from '../../shared/shared.module';

import { CategoryService } from './category.service';

@NgModule({
  imports: [
    SharedModule,
    CategoryRoutingModule
  ],
  exports: [],
  declarations: [
    CategoryMainComponent,
    CategoryTitleComponent,
    CategoryItemComponent,
    ToolTipsComponent,
    AddCategoryDialogComponent,
    CategoryEditComponent,
    ImageUploadCategoryComponent
  ],
  entryComponents: [
    ToolTipsComponent,
    AddCategoryDialogComponent
  ],
  providers: [
    CategoryService
  ]
})
export class CategoryModule { }

