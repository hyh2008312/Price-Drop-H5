import { NgModule } from '@angular/core';

import { UserShareComponent } from './user-share/user-share.component';

import { DropsRoutingModule } from './drops.routes.module';

import { SharedModule } from '../shared/shared.module';

import { DropsService } from './drops.service'
import { FaqDialogComponent } from './faq-dialog/faq-dialog.component'

@NgModule({
  imports: [
    SharedModule,
    DropsRoutingModule
  ],
  exports: [],
  declarations: [
    UserShareComponent, FaqDialogComponent
  ],
  providers: [
    DropsService
  ],
  entryComponents: [
    FaqDialogComponent
  ]
})
export class DropsModule { }

