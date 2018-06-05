import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page.component';

import { LandingPageRoutingModule } from './landing-page.routes.module';
import {SharedModule} from '../shared/shared.module';
import {PrivacyComponent} from './privacy/privacy.component';
import {FaqsComponent} from './faqs/faqs.component';
import {TermsComponent} from './terms/terms.component';
import {UsePolicyComponent} from './use-policy/use-policy.component';
import {LandingSlideComponent} from './landing-slide/landing-slide.component';

import {LandingPageService} from './landing-page.service';

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
    UsePolicyComponent,
    LandingSlideComponent
  ],
  entryComponents: [],
  providers: [
    LandingPageService
  ]
})
export class LandingPageModule { }

