import {Directive,EventEmitter,ElementRef,HostListener,Output, Input, NgZone, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[appViewScroll]'
})

export class ViewScrollDirective {

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


  @HostListener('mouseover') onMouseOver() {
    let self = this;
    this.ngZone.runOutsideAngular(() => {

      if(self.element.nativeElement.scrollTop > self.part.offsetTop) {
        self.scroll(true);
      } else {
        self.scroll(false);
      }
    });
  }

  @HostListener('touchstart') onTouchStart() {

  }

  @HostListener('touchmove') onTouchMove() {
    let self = this;
    this.ngZone.runOutsideAngular(() => {
      if(self.element.nativeElement.scrollTop > self.part.offsetTop) {
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
