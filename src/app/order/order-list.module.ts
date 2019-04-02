import { NgModule } from '@angular/core';
import { OrderListRoutingModule } from './order-list.routes.module';
import { OrderListService } from './order-list.service';

import { SharedModule } from '../shared/shared.module';
import { OrderListComponent } from './order-list/order-list.component';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { ChooseAddressComponent } from './choose-address/choose-address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { CityListComponent } from './city-list/city-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { PaymentComponent } from './payment/payment.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { PaymentFailComponent } from './payment-fail/payment-fail.component';
import { PaymentSuccessComponent } from './payment-sucess/payment-success.component';
import { CancelOrderDialogComponent } from './cancel-order-dialog/cancel-order-dialog.component';
import { TrackPackageComponent } from './track-package/track-package.component';

@NgModule({
  imports: [
    SharedModule,
    OrderListRoutingModule
  ],
  exports: [],
  declarations: [
    OrderListComponent,
    ChangeAddressComponent,
    ChooseAddressComponent,
    ConfirmOrderComponent,
    CityListComponent,
    OrderDetailComponent,
    PaymentComponent,
    DeleteDialogComponent,
    PaymentFailComponent,
    PaymentSuccessComponent,
    CancelOrderDialogComponent,
    TrackPackageComponent,
    EditAddressComponent
  ],
  entryComponents: [
    DeleteDialogComponent,
    PaymentFailComponent,
    PaymentSuccessComponent,
    CancelOrderDialogComponent,
    TrackPackageComponent
  ],
  providers: [OrderListService]
})
export class OrderListModule { }

