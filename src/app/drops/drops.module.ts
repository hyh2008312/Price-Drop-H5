import { NgModule } from '@angular/core';

import { UserShareComponent } from './user-share/user-share.component';

import { DropsRoutingModule } from './drops.routes.module';

import { SharedModule } from '../shared/shared.module';

import { DropsService } from './drops.service';
import { CutPriceDialogComponent } from './cut-price-dialog/cut-price-dialog.component'



@NgModule({
  imports: [
    SharedModule,
    DropsRoutingModule
  ],
  exports: [],
  declarations: [
    UserShareComponent, CutPriceDialogComponent
  ],
  providers: [
    DropsService
  ],
  entryComponents: [
    CutPriceDialogComponent
  ]
})
export class DropsModule { }

