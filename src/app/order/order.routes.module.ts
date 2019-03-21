import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { ChooseAddressComponent } from './choose-address/choose-address.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { CityListComponent } from './city-list/city-list.component';
import {PaymentComponent} from './payment/payment.component';

const routes: Routes = [
  {
    path: '', component: OrderListComponent
  }, {
    path: 'confirmOrder', component:  ConfirmOrderComponent,
  }, {
    path: 'changeAddress', component:  ChangeAddressComponent,
  }, {
    path: 'chooseAddress', component:  ChooseAddressComponent,
  }, {
    path: 'cityList', component:  CityListComponent,
  }, {
    path: 'orderDetail', component: OrderDetailComponent,
  }, {
    path: 'payment', component: PaymentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
