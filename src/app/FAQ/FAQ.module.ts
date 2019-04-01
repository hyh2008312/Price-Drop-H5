import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { FAQService } from './FAQ.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [],
  declarations: [
  ],
  entryComponents: [

  ],
  providers: [FAQService]
})
export class FAQModule { }

