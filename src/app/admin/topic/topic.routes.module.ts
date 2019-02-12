import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { PromoteMainComponent } from './promote-main/promote-main.component';
import { PromoteCreateComponent } from './promote-create/promote-create.component';
import { PromoteEditComponent } from './promote-edit/promote-edit.component';

const routes: Routes = [
  {
    path: '', component: PromoteMainComponent
  }, {
    path: 'create', component: PromoteCreateComponent
  }, {
    path: 'edit/:templateId/:id', component: PromoteEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule {
}
