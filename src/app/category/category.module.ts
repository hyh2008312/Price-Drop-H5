import { NgModule } from '@angular/core';

import { CategoryRoutingModule } from './category.routes.module';

import { SharedModule } from '../shared/shared.module';

import { CategoryService } from './category.service';

import { ProductListComponent } from './product-list/product-list.component';
import { CategoryPageComponent } from './category-page/category-page.component';



@NgModule({
  imports: [
    SharedModule,
    CategoryRoutingModule
  ],
  exports: [],
  declarations: [
    ProductListComponent,
    CategoryPageComponent
  ],
  entryComponents: [
    ProductListComponent,
    CategoryPageComponent
  ],
  providers: [CategoryService],
})
export class CategoryModule { }

