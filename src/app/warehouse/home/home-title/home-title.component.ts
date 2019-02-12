import {Input, Output, Component, OnInit, HostListener, ElementRef, NgZone, EventEmitter, AfterViewChecked} from '@angular/core';

@Component({
  selector: 'app-warehouse-home-title',
  templateUrl: './home-title.component.html',
  styleUrls: ['../_home.scss']
})

export class HomeTitleComponent implements OnInit {

  @Input() status: any;
  @Output() onScrollChange = new EventEmitter();
  part: any;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone
  ) { }

  ngAfterViewChecked() {
    if(this.part) {
      return;
    }
    this.part = this.element.nativeElement.querySelector(`.sc-product__product-navigation-${this.status}`);
  }

  ngOnInit(): void {

  }

  @HostListener('window:scroll', ['$event']) public windowScrolled($event: Event) {
    let self = this;
    this.ngZone.runOutsideAngular(() => {
      if(this.part.getBoundingClientRect().top < 0) {
        self.windowScrollEvent(true);
      } else if(this.part.getBoundingClientRect().top > 0) {
        self.windowScrollEvent(false);
      }
    });
  }

  windowScrollEvent($event) {
    this.onScrollChange.emit($event);
  }

}
