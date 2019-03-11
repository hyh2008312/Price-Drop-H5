import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselService, WindowWidthService } from './services';

import {
  AppComponent,
  CarouselComponent,
  SlideNewComponent,
  SlideComponent,
  CarouselArrowsComponent,
  PinsComponent
} from './components';

import { CarouselHandlerDirective, CarouselHandlerNewDirective } from './directives';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    SlideComponent,
    SlideNewComponent,
    CarouselArrowsComponent,
    PinsComponent,
    CarouselHandlerDirective,
    CarouselHandlerNewDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [CarouselComponent],
  providers: [CarouselService, WindowWidthService],
  bootstrap: [AppComponent]
})
export class CarouselModule { }
