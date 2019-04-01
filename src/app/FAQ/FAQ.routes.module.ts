import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { GoodsDetailComponent } from './goods-detail/goods-detail.component';

const routes: Routes = [
  { path: ':id', component: GoodsDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FAQRoutingModule { }
