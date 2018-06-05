import {Directive,ElementRef,Renderer, AfterViewInit,Input} from '@angular/core';

@Directive({
  selector: '[appRepeatOrder]'
})

export class RepeatOrderDirective implements AfterViewInit {

  @Input() index: string;

  constructor(private el:ElementRef, private renderer:Renderer) {
    // now, we can reference to: this.element
  }

  ngAfterViewInit() {

    this.changeViewSize();
  }

  public changeViewSize() {
    this.renderer.setElementStyle(this.el.nativeElement, "-webkit-box-ordinal-group", this.index);
    this.renderer.setElementStyle(this.el.nativeElement, "-webkit-order", this.index);
    this.renderer.setElementStyle(this.el.nativeElement, "order", this.index);
  }

}
