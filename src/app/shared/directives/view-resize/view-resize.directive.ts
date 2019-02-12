import {Directive, ElementRef, Renderer, AfterViewInit, Input} from '@angular/core';

@Directive({
  selector: '[appViewResize]'
})

export class ViewResizeDirective implements AfterViewInit {

  @Input() margin: number = 0;

  constructor(private el:ElementRef, private renderer:Renderer) {

  }

  ngAfterViewInit() {
    let self = this;

    this.changeViewSize();

    window.onresize = function() {
      self.changeViewSize();
    };
  }

  public changeViewSize() {
    this.renderer.setElementStyle(this.el.nativeElement, "height", (window.innerHeight - this.margin) + 'px');
  }

}
