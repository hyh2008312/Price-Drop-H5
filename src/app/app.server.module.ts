// angular
import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
// libs
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
// shared
import { UniversalStorage } from './shared-server/for-storage/server.storage';
import { AppStorage } from './shared-server/for-storage/universal.inject';
import { TranslatesServerModule } from './shared-server/translates/translates-server';
// components
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

import {FlexLayoutServerModule} from '@angular/flex-layout/server';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    TranslatesServerModule,
    ServerTransferStateModule,
    FlexLayoutServerModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: AppStorage, useClass: UniversalStorage }
  ],
})
export class AppServerModule {
}
