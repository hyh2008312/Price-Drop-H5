import { NgModule } from '@angular/core';

import { SpecificationMainComponent } from './specification-main/specification-main.component';
import { SpecificationEditComponent } from './specification-edit/specification-edit.component';
import { SpecificationTitleComponent } from './specification-title/specification-title.component';
import { SpecificationItemComponent } from './specification-item/specification-item.component';
import { AttributeTitleComponent } from './attribute-title/attribute-title.component';
import { AttributeItemComponent } from './attribute-item/attribute-item.component';
import { AttributeValueTitleComponent } from './attribute-value-title/attribute-value-title.component';
import { AttributeValueItemComponent } from './attribute-value-item/attribute-value-item.component';
import { AttributeCategoryTitleComponent } from './attribute-category-title/attribute-category-title.component';
import { AttributeCategoryItemComponent } from './attribute-category-item/attribute-category-item.component';
import { AddAttributeDialogComponent } from './add-attribute-dialog/add-attribute-dialog.component';
import { AddAttributeValueDialogComponent } from './add-attribute-value-dialog/add-attribute-value-dialog.component';
import { AddCategoryAttributeDialogComponent } from './add-category-attribute-dialog/add-category-attribute-dialog.component';
import { AddAttributeValueListDialogComponent } from './add-attribute-value-list-dialog/add-attribute-value-list-dialog.component';
import { AddCategoryAttributeValueListDialogComponent } from './add-category-attribute-value-list-dialog/add-category-attribute-value-list-dialog.component';
import { ToolTipsComponent } from './tool-tips/tool-tips.component';

import { SpecificationRoutingModule } from './specification.routes.module';
import { SharedModule } from '../../shared/shared.module';

import { SpecificationService } from './specification.service';

@NgModule({
  imports: [
    SharedModule,
    SpecificationRoutingModule
  ],
  exports: [],
  declarations: [
    SpecificationMainComponent,
    SpecificationEditComponent,
    SpecificationTitleComponent,
    SpecificationItemComponent,
    ToolTipsComponent,
    AttributeTitleComponent,
    AttributeItemComponent,
    AddAttributeDialogComponent,
    AddCategoryAttributeDialogComponent,
    AttributeCategoryItemComponent,
    AttributeCategoryTitleComponent,
    AddAttributeValueDialogComponent,
    AttributeValueTitleComponent,
    AttributeValueItemComponent,
    AddAttributeValueListDialogComponent,
    AddCategoryAttributeValueListDialogComponent
  ],
  entryComponents: [
    ToolTipsComponent,
    AddAttributeDialogComponent,
    AddCategoryAttributeDialogComponent,
    AddAttributeValueDialogComponent,
    AddAttributeValueListDialogComponent,
    AddCategoryAttributeValueListDialogComponent
  ],
  providers: [
    SpecificationService
  ]
})
export class SpecificationModule { }

