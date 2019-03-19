import { NgModule } from '@angular/core';
import { OrderRoutingModule } from './order.routes.module';
import { SharedModule } from '../shared/shared.module';
import { OrderListComponent } from './order-list/order-list.component';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { ChooseAddressComponent } from './choose-address/choose-address.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';

import { OrderService } from './order.service';

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
    ConfirmOrderComponent
  ],
  entryComponents: [],
  providers: [OrderService]
})
export class OrderModule { }

