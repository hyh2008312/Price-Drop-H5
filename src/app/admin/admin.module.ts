import { NgModule } from '@angular/core';

import { MainComponent } from './main/main.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';

import { AdminRoutingModule } from './admin.routes.module';

import { AdminService } from './admin.service';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  exports: [],
  declarations: [
    MainComponent,
    TopNavigationComponent
  ],
  entryComponents: [

  ],
  providers: [
    AdminService,
    AuthenticationService
  ]
})
export class AdminModule { }

