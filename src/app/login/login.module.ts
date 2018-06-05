import { NgModule } from '@angular/core';

import { LoginComponent } from "./login/login.component";

import { LoginRoutingModule } from './login.routes.module';
import { LoginService } from './login.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  exports: [],
  declarations: [
    LoginComponent,
  ],
  providers: [
    LoginService
  ],
  entryComponents: []
})
export class LoginModule { }

