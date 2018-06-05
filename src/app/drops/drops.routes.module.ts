import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { UserShareComponent } from './user-share/user-share.component';

const routes: Routes = [
  { path: 'detail/:cutId', component: UserShareComponent },
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class DropsRoutingModule{ }
