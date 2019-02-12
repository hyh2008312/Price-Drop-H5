import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProductMainComponent} from './product-main/product-main.component';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductDraftEditComponent} from './product-draft-edit/product-draft-edit.component';

const routes: Routes = [
  {
    path: '', component: ProductMainComponent
  }, {
    path: 'create', component: ProductCreateComponent
  }, {
    path: 'edit/:id', component: ProductEditComponent
  }, {
    path: 'draftedit/:id', component: ProductDraftEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
