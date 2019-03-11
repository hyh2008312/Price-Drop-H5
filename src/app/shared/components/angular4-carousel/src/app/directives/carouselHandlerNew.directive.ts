import { Directive, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';

import { CarouselService, ICarouselConfig } from '../services';

@Directive({
  selector: '[appCarouselHandlerNew]'
})
export class CarouselHandlerNewDirective implements OnInit {
  @Output() public handleAutoplay: EventEmitter<boolean> = new EventEmitter();

  private config: ICarouselConfig;
  private currentSlide = 0;

  constructor(private el: ElementRef, private carouselService: CarouselService) {}

  public setNewSlide(newSlide: number, direction: string): void {
    const currentSlide = this.el.nativeElement.querySelector(`[data-slide="${this.currentSlide}"]`);
    const nextSlide = this.el.nativeElement.querySelector(`[data-slide="${newSlide}"]`);

    this.animate(currentSlide, nextSlide, direction);

    this.currentSlide = newSlide;
  }

  private animate(currentSlide: HTMLElement, nextSlide: HTMLElement, direction: string): void {
    if (!this.config.animation) {
      this.toggleClass('slide-new--hidden-initial', currentSlide, nextSlide);
      return;
    }

    const animationType = this.config.animationType;
    currentSlide.className = nextSlide.className = 'slide-new';
    this.toggleClass(`slide-new--hidden-${animationType}-${direction}`, currentSlide);
    this.toggleClass(`slide-new--show-${animationType}-${direction}`, nextSlide);
  }

  private toggleClass(className: string, ...elements): void {
    elements.forEach((element) => {
      element.classList.toggle(className);
    });
  }

  ngOnInit() {
    this.config = this.carouselService.getConfig();

    if (this.config.autoplay) {
      this.autoplayHandler();
    }
  }

  private autoplayHandler(): void {
    this.el.nativeElement.addEventListener('mouseenter', () => {
      this.handleAutoplay.emit(true);
    });

    this.el.nativeElement.addEventListener('mouseleave', () => {
      this.handleAutoplay.emit(false);
    });

    document.addEventListener('visibilitychange', () => {
      this.handleAutoplay.emit(document.hidden);
    });
  }
}
