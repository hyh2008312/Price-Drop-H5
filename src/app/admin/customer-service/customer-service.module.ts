import {NgModule} from '@angular/core';

import {CustomerServiceMainComponent} from './customer-service-main/customer-service-main.component';
import {CustomerServiceRoutingModule} from './customer-service.routes.module';
import {SharedModule} from '../../shared/shared.module';
import {CustomerServiceTitleComponent} from "./customer-service-title/customer-service-title.component";
import {CustomerServiceItemComponent} from "./customer-service-item/customer-service-item.component";
import {CustomerServiceDetailComponent} from "./customer-service-detail/customer-service-detail.component";
import {CustomerServiceMessageComponent} from "./customer-service-message/customer-service-message.component";
import {CustomerService} from "./customer.service";

@NgModule({
  imports: [
    SharedModule,
    CustomerServiceRoutingModule
  ],
  exports: [],
  declarations: [
    CustomerServiceMainComponent,
    CustomerServiceTitleComponent,
    CustomerServiceItemComponent,
    CustomerServiceDetailComponent,
    CustomerServiceMessageComponent
  ],
  entryComponents: [],
  providers: [CustomerService]
})
export class CustomerServiceModule {
}

