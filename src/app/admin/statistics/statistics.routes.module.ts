import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { StatisticsMainComponent } from './statistics-main/statistics-main.component';

const routes: Routes = [
  {
    path: '', component: StatisticsMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule {
}
