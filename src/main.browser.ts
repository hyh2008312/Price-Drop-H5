import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppBrowserModule } from './app/app.browser.module';

if (environment.production) {
  enableProdMode();

  (<any>window).console.warn = function() {};
  (<any>window).console.info = function() {};
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppBrowserModule).catch(err => console.log(err));
});
