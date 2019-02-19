import { NgModule } from '@angular/core';

import { UserShareComponent } from './user-share/user-share.component';

import { DropsRoutingModule } from './drops.routes.module';

import { SharedModule } from '../shared/shared.module';

import { DropsService } from './drops.service';


@NgModule({
  imports: [
    SharedModule,
    DropsRoutingModule
  ],
  exports: [],
  declarations: [
    UserShareComponent
  ],
  providers: [
    DropsService
  ],
  entryComponents: [
  ]
})
export class DropsModule { }

