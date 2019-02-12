import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ReportMainComponent} from './report-main/report-main.component';

const routes: Routes = [
  {
    path: '', component: ReportMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {
}
