import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { GoodsDetailComponent } from './goods-detail/goods-detail.component';
import { GoodsDescriptionComponent } from './goods-description/goods-description.component';

const routes: Routes = [
  { path: ':id', component: GoodsDetailComponent },
  { path: ':id/goodsDescription', component: GoodsDescriptionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodsDetailRoutingModule { }
