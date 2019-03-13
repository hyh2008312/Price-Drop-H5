import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { CategoryPageComponent } from './category-page/category-page.component';

const routes: Routes = [
  {
    path: '', component: CategoryPageComponent,
    // children: [
    //   {
    //     path: 'productList',
    //     loadChildren: './product-list/product-list.module#ProductListModule'
    //   },
    // ]
  }, {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
