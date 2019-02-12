import { NgModule } from '@angular/core';

import { SignUpHeaderComponent } from "./sign-up-header/sign-up-header.component";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { WarehouseLoginComponent } from './warehouse-login/warehouse-login.component';
import { NavigationHeaderWarehouseComponent } from './navigation-header-warehouse/navigation-header-warehouse.component';
import { InviteCodeComponent } from "./invite-code/invite-code.component";

import { LoginRoutingModule } from './login.routes.module';
import { LoginService } from './login.service';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  exports: [],
  declarations: [
    SignUpHeaderComponent,
    LoginComponent,
    WarehouseLoginComponent,
    NavigationHeaderWarehouseComponent,
    SignUpComponent,
    InviteCodeComponent
  ],
  providers: [
    LoginService,
    AuthenticationService
  ]
})
export class LoginModule { }

