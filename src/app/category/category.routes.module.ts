import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { CategoryPageComponent } from './category-page/category-page.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '', component: CategoryPageComponent,
  }, {
    path: 'list/:id', component: ProductListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
