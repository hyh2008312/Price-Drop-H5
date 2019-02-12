import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { OrderMainComponent } from './order-main/order-main.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderReturnDetailComponent } from './order-return-detail/order-return-detail.component';

const routes: Routes = [
  {
    path: '', component: OrderMainComponent
  },
  {
    path: 'detail/:id', component: OrderDetailComponent
  },
  {
    path: 'return/:id', component: OrderReturnDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderWarehouseRoutingModule {
}
