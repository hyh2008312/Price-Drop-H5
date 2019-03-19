import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { ChooseAddressComponent } from './choose-address/choose-address.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';

const routes: Routes = [
  {
    path: '', component: OrderListComponent
  }, {
    path: 'confirmOrder', component:  ConfirmOrderComponent,
  }, {
    path: 'changeAddress', component:  ChangeAddressComponent,
  }, {
    path: 'chooseAddress', component:  ChooseAddressComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
