import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { PromoteMainComponent } from './promote-main/promote-main.component';

const routes: Routes = [
  {
    path: '', component: PromoteMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule {
}
