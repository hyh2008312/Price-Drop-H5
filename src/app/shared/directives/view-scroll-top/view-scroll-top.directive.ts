import {Directive, EventEmitter, ElementRef, HostListener, Output, Input, NgZone, AfterViewChecked, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

@Directive({
  selector: '[appViewScrollTop]'
})

export class ViewScrollTopDirective {
  @Input() ContainerSelector: string = '';
  @Input() NavigateSelector: string = '';
  @Output() changeHidden = new EventEmitter<boolean>();
  @Output() isShowNavigation = new EventEmitter<boolean>();
  ContainerDetail: any;
  NavigateDetail: any;

  constructor(private element: ElementRef,
              private ngZone: NgZone,
              @Inject(DOCUMENT) private document: Document) {
    // now, we can reference to: this.element
  }

  ngAfterViewChecked() {
    if (this.ContainerDetail) {
      return;
    }
    if (this.NavigateDetail) {
      return;
    }
    if (this.ContainerSelector.length > 0) {
      this.ContainerDetail = this.document.querySelector(`.${this.ContainerSelector}`);
    }
    if (this.NavigateSelector.length > 0) {
      this.NavigateDetail = this.document.querySelector(`.${this.NavigateSelector}`);
    }
  }

  @HostListener('scroll')
  onScroll() {
    let self = this;
    this.ngZone.runOutsideAngular(() => {
      if (self.NavigateDetail.getBoundingClientRect().top < 0) {
        self.isShowNavigation.emit(true);
      } else {
        self.isShowNavigation.emit(false);
      }
    });
  }

  public setScrollTop(): void {
    let self = this;
    this.ContainerDetail.scrollTop = 0;
  }
}
