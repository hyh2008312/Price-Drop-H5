import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {InventoryMainComponent} from './inventory-main/inventory-main.component';

const routes: Routes = [
  {
    path: '', component: InventoryMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule {
}
