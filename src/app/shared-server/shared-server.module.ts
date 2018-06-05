import { ModuleWithProviders, NgModule } from '@angular/core';

import { SharedMetaModule } from './shared-meta';
import { TransferHttpModule } from './transfer-http';

@NgModule({
  exports: [
    SharedMetaModule,
    TransferHttpModule
  ],
  providers: []
})
export class SharedServerModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SharedServerModule };
  }
}
