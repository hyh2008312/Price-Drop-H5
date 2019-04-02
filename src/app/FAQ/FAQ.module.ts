import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import {FAQRoutingModule} from './FAQ.routes.module';
import { FAQService } from './FAQ.service';

import {FaqComponent} from './faq/faq.component';
import {FaqQaComponent} from './faq-qa/faq-qa.component';
import {AboutComponent} from './about/about.component';
import {AboutTmpComponent} from './about-tmp/about-tmp.component';

@NgModule({
  imports: [
    SharedModule,
    FAQRoutingModule
  ],
  exports: [],
  declarations: [
    FaqComponent,
    FaqQaComponent,
    AboutComponent,
    AboutTmpComponent
  ],
  entryComponents: [
    FaqComponent,
    FaqQaComponent,
    AboutComponent,
    AboutTmpComponent
  ],
  providers: [FAQService]
})
export class FAQModule { }

