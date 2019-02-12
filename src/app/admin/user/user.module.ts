import {NgModule} from '@angular/core';

import {UserRoutingModule} from './user.routes.module';
import {SharedModule} from '../../shared/shared.module';
import {AccountService} from "./user.service";
import {UserItemComponent} from "./user-item/user-item.component";
import {UserMainComponent} from "./user-main/user-main.component";

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  exports: [],
  declarations: [
    UserItemComponent,
    UserMainComponent
  ],
  entryComponents: [],
  providers: [AccountService]
})
export class UserModule {
}

