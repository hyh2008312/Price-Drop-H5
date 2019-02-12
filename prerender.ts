import { environment } from './src/environments/environment';
import fetch from 'node-fetch';
import 'localstorage-polyfill';

const domino = require('domino');
const fs = require('fs');
const path = require('path');
const template = fs.readFileSync(path.join(__dirname, '.', 'browser', 'index.html')).toString();
const win = domino.createWindow(template);
const files = fs.readdirSync(`${process.cwd()}/dist/server`);
// const styleFiles = files.filter(file => file.startsWith('styles'));
// const hashStyle = styleFiles[0].split('.')[1];
// const style = fs.readFileSync(path.join(__dirname, '.', 'server', `styles.${hashStyle}.bundle.css`)).toString();
win.fetch = fetch;
global['window'] = win;
global['DOMTokenList'] = win.DOMTokenList;
global['Node'] = win.Node;
global['Text'] = win.Text;
global['HTMLElement'] = win.HTMLElement;
global['navigator'] = win.navigator;
global['Event'] = win.Event;
global['Event']['prototype'] = win.Event.prototype;
Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  },
});
global['document'] = win.document;
global['CSS'] = null;
global['localStorage'] = localStorage;
global['location'] = win.location;
global['Image'] = win.Image;
global['HTMLAnchorElement'] = win.HTMLAnchorElement;
global['html2pdf'] = win.html2pdf;
global['URL'] = win.URL || {};

// Load zone.js for the server.
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

import { enableProdMode } from '@angular/core';
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { renderModuleFactory } from '@angular/platform-server';
import { ROUTES } from './static.paths';

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const mainFiles = files.filter(file => file.startsWith('main'));
const hash = mainFiles[0].split('.')[1];
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist/server/main.${hash}.bundle`);
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';

const BROWSER_FOLDER = join(process.cwd(), 'static');

// Load the index.html file containing referances to your application bundle.
const index = readFileSync(join(__dirname, '.', 'browser', 'index.html'), 'utf8');

let previousRender = Promise.resolve();

// Iterate each route path
ROUTES.forEach(route => {
  const fullPath = join(BROWSER_FOLDER, route);

  // Make sure the directory structure is there
  if (!existsSync(fullPath)) {
    mkdirSync(fullPath);
  }

  // Writes rendered HTML to index.html, replacing the file if it already exists.
  previousRender = previousRender.then(_ => renderModuleFactory(AppServerModuleNgFactory, {
    document: index,
    url: route,
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP),
      {
        provide: REQUEST, useValue: null
      },
      {
        provide: RESPONSE, useValue: null
      },
      {
        provide: 'ORIGIN_URL',
        useValue: environment.host
      }
    ]
  })).then(html => writeFileSync(join(fullPath, 'index.html'), html));
});
