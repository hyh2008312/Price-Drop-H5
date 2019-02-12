import { NgModule } from '@angular/core';

import { SizeChartMainComponent } from './sizeChart-main/sizeChart-main.component';
import { SizeChartCreateComponent } from './sizeChart-create/sizeChart-create.component';
import { SizeChartEditComponent } from './sizeChart-edit/sizeChart-edit.component';
import { SizeChartTitleComponent } from './sizeChart-title/sizeChart-title.component';
import { SizeChartItemComponent } from './sizeChart-item/sizeChart-item.component';
import { SizeChartProductTitleComponent } from './sizeChart-product-title/sizeChart-product-title.component';
import { SizeChartProductItemComponent } from './sizeChart-product-item/sizeChart-product-item.component';
import { AddTabDialogComponent } from './add-tab-dialog/add-tab-dialog.component';
import { SelectProductDialogComponent } from './select-product-dialog/select-product-dialog.component';
import { SelectMultiProductDialogComponent } from './select-multi-product-dialog/select-multi-product-dialog.component';
import { SelectProductTitleComponent } from './select-product-title/select-product-title.component';
import { SelectProductItemComponent } from './select-product-item/select-product-item.component';
import { PaginationComponent } from  './pagination/pagination.component';
import { ImageUploadAdditionalComponent } from './image-upload-additional/image-upload-additional.component';
import { ImageUploadMultiComponent } from './image-upload-multi/image-upload-multi.component';
import { ToolTipsComponent } from './tool-tips/tool-tips.component';

import { SizeChartRoutingModule } from './sizeChart.routes.module';
import { SharedModule } from '../../shared/shared.module';

import { SizeChartService } from './sizeChart.service';

@NgModule({
  imports: [
    SharedModule,
    SizeChartRoutingModule
  ],
  exports: [],
  declarations: [
    SizeChartMainComponent,
    SizeChartCreateComponent,
    SizeChartEditComponent,
    SizeChartTitleComponent,
    SizeChartItemComponent,
    ToolTipsComponent,
    SizeChartProductTitleComponent,
    SizeChartProductItemComponent,
    AddTabDialogComponent,
    SelectProductDialogComponent,
    SelectProductTitleComponent,
    SelectProductItemComponent,
    PaginationComponent,
    SelectMultiProductDialogComponent,
    ImageUploadAdditionalComponent,
    ImageUploadMultiComponent
  ],
  entryComponents: [
    ToolTipsComponent,
    AddTabDialogComponent,
    SelectProductDialogComponent,
    SelectMultiProductDialogComponent,
    ImageUploadMultiComponent
  ],
  providers: [
    SizeChartService
  ]
})
export class SizeChartModule { }

