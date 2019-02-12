import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { LotteryMainComponent } from './lottery-main/lottery-main.component';
import { LotteryAwardCreateComponent } from './lottery-award-create/lottery-award-create.component';
import { LotteryAwardEditComponent } from './lottery-award-edit/lottery-award-edit.component';
import { PromoteCreateComponent } from './promote-create/promote-create.component';
import { PromoteEditComponent } from './promote-edit/promote-edit.component';

const routes: Routes = [
  {
    path: '', component: LotteryMainComponent
  },
  {
    path: 'prize/create', component: LotteryAwardCreateComponent
  },
  {
    path: 'prize/edit/:id', component: LotteryAwardEditComponent
  },
  {
    path: 'campaign/create', component: PromoteCreateComponent
  },
  {
    path: 'campaign/edit/:id', component: PromoteEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LotteryRoutingModule {
}
