import {Directive, EventEmitter, ElementRef, HostListener, Output, Input, NgZone, AfterViewChecked} from '@angular/core';

@Directive({
  selector: '[appViewShareScroll]'
})

export class ViewShareScrollDirective {
  @Input() detailSelector: string = '';
  @Input() shareSelector: string = '';
  @Output() changeHidden = new EventEmitter<boolean>();

  partDetail: any;
  partShare: any;

  constructor(private element: ElementRef,
              private ngZone: NgZone) {
    // now, we can reference to: this.element
  }

  ngAfterViewChecked() {
    if (this.partDetail) {
      return;
    }
    if (this.partShare) {
      return;
    }
    this.partDetail = this.element.nativeElement.querySelector(`.${this.detailSelector}`);
    this.partShare = this.element.nativeElement.querySelector(`.${this.shareSelector}`);
  }


  @HostListener('mouseover')
  onMouseOver() {
    let self = this;
    this.ngZone.runOutsideAngular(() => {
      let top = self.partDetail.getBoundingClientRect().height + self.partDetail.getBoundingClientRect().top
      let shareTop = self.partShare.getBoundingClientRect().top
      if (top > 700) {
        self.changedHiddenShare(false);
      } else {
        self.changedHiddenShare(true);
      }
    });
  }


  public setPositionOfShare(): void {
    let self = this;
    let width = self.partDetail.getBoundingClientRect().width + self.partDetail.getBoundingClientRect().left + 32;
    self.partShare.style.left = `${width}px`;
    self.changedHiddenShare(false);
  }

  changedHiddenShare(isHidden: boolean): void {
    this.changeHidden.emit(isHidden);
  }
}
