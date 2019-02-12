import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { MembershipMainComponent } from './membership-main/membership-main.component';
import { MembershipCreateComponent } from './membership-create/membership-create.component';
import { MembershipEditComponent } from './membership-edit/membership-edit.component';
import { MembershipDetailComponent } from './membership-detail/membership-detail.component';

const routes: Routes = [
  {
    path: '', component: MembershipMainComponent
  },
  {
    path: 'item/create', component: MembershipCreateComponent
  },
  {
    path: 'item/edit/:id', component: MembershipEditComponent
  },
  {
    path: 'detail/:id', component: MembershipDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipRoutingModule {
}
