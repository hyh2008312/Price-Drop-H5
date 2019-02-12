import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { LandingPageComponent } from './landing-page.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {FaqsComponent} from './faqs/faqs.component';
import {TermsComponent} from './terms/terms.component';
import {UsePolicyComponent} from './use-policy/use-policy.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'faq', component: FaqsComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'aup', component: UsePolicyComponent },
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class LandingPageRoutingModule{ }
