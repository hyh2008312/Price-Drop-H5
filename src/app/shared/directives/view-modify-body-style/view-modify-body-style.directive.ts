import {Directive, EventEmitter, ElementRef, HostListener, Output, Input, NgZone, AfterViewChecked, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

@Directive({
  selector: '[appModifyBodyStyle]'
})


export class ViewModifyBodyStyleDirective {
  @Input() NavigateSelector: string = '';
  ContainerDetail: any;
  constructor(private element: ElementRef,
              private ngZone: NgZone,
              @Inject(DOCUMENT) private document: Document) {
    // now, we can reference to: this.element
    this.updateBodyStyle();
  }

  ngAfterViewChecked() {
    if (this.ContainerDetail) {
      return;
    }
    if (this.NavigateSelector.length > 0) {
      this.ContainerDetail = this.document.querySelector(`.${this.NavigateSelector}`);
      this.ContainerDetail.style.height='auto';
    }
  }

  updateBodyStyle() {
    this.document.body.style.overflowY = 'auto';
  }

  scrollToTop() {
    this.document.querySelector('html').scrollTop = 0;
  }
}
