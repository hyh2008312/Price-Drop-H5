import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { SizeChartMainComponent } from './sizeChart-main/sizeChart-main.component';
import { SizeChartEditComponent } from './sizeChart-edit/sizeChart-edit.component';
import { SizeChartCreateComponent } from './sizeChart-create/sizeChart-create.component';

const routes: Routes = [
  {
    path: '', component: SizeChartMainComponent
  },
  {
    path: 'create', component: SizeChartCreateComponent
  },
  {
    path: 'edit/:id', component: SizeChartEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SizeChartRoutingModule {}
