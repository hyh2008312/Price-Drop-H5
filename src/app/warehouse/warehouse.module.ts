import { NgModule } from '@angular/core';

import { MainComponent } from './main/main.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';

import { WarehouseRoutingModule } from './warehouse.routes.module';

import { WarehouseService } from './warehouse.service';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    WarehouseRoutingModule
  ],
  exports: [],
  declarations: [
    MainComponent,
    TopNavigationComponent
  ],
  entryComponents: [

  ],
  providers: [
    WarehouseService,
    AuthenticationService
  ]
})
export class WarehouseModule { }

