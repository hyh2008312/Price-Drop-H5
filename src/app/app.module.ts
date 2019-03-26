import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { CookieService } from 'ngx-cookie-service';

import { AppRoutes } from './app.routes.module';

import { SharedModule } from './shared/shared.module';

// shared
import { SharedServerModule } from './shared-server/shared-server.module';

import { AppComponent } from './app.component';

import { BaseApi, SystemConstant, DataApi } from './config/app.api';

import { AuthenticationModule } from './shared/services/authentication';
import { UserModule } from './shared/services/user/user.module';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { PrebootModule } from 'preboot';

import { GuardLinkService } from './shared/services/guard-link/guard-link.service';
import { OrderService } from './shared/services/order/order.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'socialcommer-shop' }),
    BrowserTransferStateModule,
    TransferHttpCacheModule,
    AppRoutes,
    HttpModule,
    HttpClientModule,
    JsonpModule,
    AuthenticationModule,
    UserModule.forRoot(),
    Angulartics2Module.forRoot([ Angulartics2GoogleTagManager], {
      pageTracking: {
        autoTrackVirtualPages: true
      }
    }),
    SharedServerModule.forRoot(),
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    PrebootModule.withConfig({
      appRoot: 'app-root'
    })
  ],
  providers: [BaseApi, SystemConstant, DataApi, HttpClientModule, CookieService, GuardLinkService, OrderService],
  bootstrap: [AppComponent]
})
export class AppInModule {}
