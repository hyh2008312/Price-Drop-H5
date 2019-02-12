import {Input, Output, Component, OnInit, EventEmitter, HostListener, ElementRef, NgZone} from '@angular/core';

@Component({
  selector: 'app-warehouse-inventory-title',
  templateUrl: './inventory-title.component.html',
  styleUrls: ['../_inventory.scss']
})

export class InventoryTitleComponent implements OnInit {

  @Input() status: any = 0;
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
