import {Input, Output, Component, OnInit, HostListener, EventEmitter, ElementRef, NgZone, AfterViewChecked} from '@angular/core';

@Component({
  selector: 'app-warehouse-order-title',
  templateUrl: './order-title.component.html',
  styleUrls: ['../_order.scss']
})

export class OrderTitleComponent implements OnInit {

  @Input() status: any;
  @Output() onScrollChange = new EventEmitter();
  part: any;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {

  }
  ngAfterViewChecked() {
    if(this.part) {
      return;
    }
    this.part = this.element.nativeElement.querySelector(`.sc-order__product-navigation-${this.status}`);
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
