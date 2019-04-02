import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FaqComponent } from './faq/faq.component';
import { FAQService } from './FAQ.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [],
  declarations: [
    FaqComponent
  ],
  entryComponents: [

  ],
  providers: [FAQService]
})
export class FAQModule { }

