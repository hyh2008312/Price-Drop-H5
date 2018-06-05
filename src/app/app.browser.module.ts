// angular
import { NgModule } from '@angular/core';
// libs

import { REQUEST } from '@nguniversal/express-engine/tokens';
// shared
import { CookieStorage } from './shared-server/for-storage/browser.storage';
import { AppStorage } from './shared-server/for-storage/universal.inject';
import { TranslatesBrowserModule } from './shared-server/translates/translates-browser';

// components
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

// the Request object only lives on the server
export function getRequest(): any {
  return { headers: { cookie: document.cookie } };
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    AppModule,
    TranslatesBrowserModule
  ],
  providers: [
    {
      // The server provides these in main.server
      provide: REQUEST, useFactory: (getRequest)
    },
    { provide: AppStorage, useClass: CookieStorage },
    { provide: 'ORIGIN_URL', useValue: location.origin }
  ]
})
export class AppBrowserModule {
}
