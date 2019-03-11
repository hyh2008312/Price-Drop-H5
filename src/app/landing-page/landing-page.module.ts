import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { LandingPageRoutingModule } from './landing-page.routes.module';
import { SharedModule } from '../shared/shared.module';

import { LandingPageService } from './landing-page.service';

@NgModule({
  imports: [
    SharedModule,
    LandingPageRoutingModule
  ],
  exports: [],
  declarations: [
    LandingPageComponent
  ],
  entryComponents: [],
  providers: [LandingPageService]
})
export class LandingPageModule { }

