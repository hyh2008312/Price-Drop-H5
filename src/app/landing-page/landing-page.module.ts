import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page.component';

import { LandingPageRoutingModule } from './landing-page.routes.module';
import { SharedModule } from '../shared/shared.module';
import {PrivacyComponent} from './privacy/privacy.component';
import {FaqsComponent} from './faqs/faqs.component';
import {TermsComponent} from './terms/terms.component';
import {UsePolicyComponent} from './use-policy/use-policy.component';

@NgModule({
  imports: [
    SharedModule,
    LandingPageRoutingModule
  ],
  exports: [

  ],
  declarations: [
    LandingPageComponent,
    PrivacyComponent,
    FaqsComponent,
    TermsComponent,
    UsePolicyComponent
  ],
  entryComponents: [],
  providers: []
})
export class LandingPageModule { }

