import { NgModule } from '@angular/core';
import { OrderRoutingModule } from './order.routes.module';
import { OrderService } from './order.service';

import { SharedModule } from '../shared/shared.module';
import { OrderListComponent } from './order-list/order-list.component';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { ChooseAddressComponent } from './choose-address/choose-address.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { CityListComponent } from './city-list/city-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  imports: [
    SharedModule,
    OrderRoutingModule
  ],
  exports: [],
  declarations: [
    OrderListComponent,
    ChangeAddressComponent,
    ChooseAddressComponent,
    ConfirmOrderComponent,
    CityListComponent,
    OrderDetailComponent,
    PaymentComponent
  ],
  entryComponents: [],
  providers: [OrderService]
})
export class OrderModule { }

