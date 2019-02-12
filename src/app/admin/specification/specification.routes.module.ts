import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { SpecificationMainComponent } from './specification-main/specification-main.component';
import { SpecificationEditComponent } from './specification-edit/specification-edit.component';

const routes: Routes = [
  {
    path: '', component: SpecificationMainComponent
  },
  {
    path: 'edit/:id', component: SpecificationEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecificationRoutingModule {
}
