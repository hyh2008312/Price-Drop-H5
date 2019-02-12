import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { ReviewComponent } from './review-main/review-main.component';

const routes: Routes = [
  {
    path: '', component: ReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SizeChartRoutingModule {}
