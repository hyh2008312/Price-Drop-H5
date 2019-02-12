import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CustomerServiceMainComponent} from './customer-service-main/customer-service-main.component';
import {CustomerServiceDetailComponent} from "./customer-service-detail/customer-service-detail.component";

const routes: Routes = [
  {
    path: '', component: CustomerServiceMainComponent
  }, {
    path: 'detail/:id', component: CustomerServiceDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerServiceRoutingModule {
}
