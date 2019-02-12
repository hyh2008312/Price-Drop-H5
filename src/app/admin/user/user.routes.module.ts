import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserMainComponent} from "./user-main/user-main.component";

const routes: Routes = [
  {
    path: '', component: UserMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
