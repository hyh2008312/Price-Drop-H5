import {Directive,EventEmitter,ElementRef,HostListener,Output, Input, NgZone, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[appViewObjectScroll]'
})

export class ViewObjectScrollDirective {

  @Output() onScrollChange = new EventEmitter();
  @Input() selector: string = '';

  part: any;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone
  ) {
    // now, we can reference to: this.element
  }

  ngAfterViewChecked() {
    if(this.part) {
      return;
    }
    this.part = this.element.nativeElement.querySelector(`.${this.selector}`);
  }

  @HostListener('scroll') onScroll() {
    let self = this;
    this.ngZone.runOutsideAngular(() => {
      if(self.part.getBoundingClientRect().top < 0) {
        self.scroll(true);
      } else {
        self.scroll(false);
      }
    });
  }

  @HostListener('mouseover') onMouseOver() {
    let self = this;
    this.ngZone.runOutsideAngular(() => {
      if(self.part.getBoundingClientRect().top < 0) {
        self.scroll(true);
      } else {
        self.scroll(false);
      }
    });
  }

  @HostListener('touchstart') onTouchStart() {
    let self = this;
    this.ngZone.runOutsideAngular(() => {
      if(self.part.getBoundingClientRect().top < 0) {
        self.scroll(true);
      } else {
        self.scroll(false);
      }
    });
  }

  @HostListener('touchmove') onTouchMove() {
    let self = this;
    this.ngZone.runOutsideAngular(() => {
      if(self.part.getBoundingClientRect().top < 0) {
        self.scroll(true);
      } else {
        self.scroll(false);
      }
    });
  }

  scroll(scrolledUp:boolean) {
    this.onScrollChange.emit(scrolledUp);
  }

}
