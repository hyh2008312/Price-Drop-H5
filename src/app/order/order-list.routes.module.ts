import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { ChooseAddressComponent } from './choose-address/choose-address.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { CityListComponent } from './city-list/city-list.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentFailComponent } from './payment-fail/payment-fail.component';
import { PaymentSuccessComponent } from './payment-sucess/payment-success.component';
import { TrackPackageComponent } from './track-package/track-package.component';
import { EditAddressComponent } from './edit-address/edit-address.component';

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
    path: 'orderDetail/:id', component: OrderDetailComponent,
  }, {
    path: 'orderList', component: OrderListComponent,
  }, {
    path: 'payment', component: PaymentComponent,
  }, {
    path: 'paymentFail', component: PaymentFailComponent,
  }, {
    path: 'paymentSuccess', component: PaymentSuccessComponent,
  }, {
    path: 'trackPackage/:id', component: TrackPackageComponent,
  }, {
    path: 'editAddress/:id', component:  EditAddressComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderListRoutingModule { }
