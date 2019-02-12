import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TrackingMainComponent} from './tracking-main/tracking-main.component';

const routes: Routes = [
  {
    path: '', component: TrackingMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule {
}
