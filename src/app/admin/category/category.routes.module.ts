import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { CategoryMainComponent } from './category-main/category-main.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

const routes: Routes = [
  {
    path: '', component: CategoryMainComponent
  },
  {
    path: 'edit/:id', component: CategoryEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}
