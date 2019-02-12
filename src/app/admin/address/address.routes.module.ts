import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AddressMainComponent } from './address-main/address-main.component';
import { AddressCreateComponent } from './address-create/address-create.component';
import { AddressEditComponent } from './address-edit/address-edit.component';

const routes: Routes = [
  {
    path: '', component: AddressMainComponent
  }, {
    path: 'create', component: AddressCreateComponent
  }, {
    path: 'edit/:id', component: AddressEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule {
}
