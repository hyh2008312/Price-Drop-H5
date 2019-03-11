import { Component, Input } from '@angular/core';

@Component({
  selector: 'carousel-new-slide',
  templateUrl: 'slide.template.html',
  styleUrls: ['./assets/slide.styles.scss']
})
export class SlideNewComponent {
  @Input() public src: any;
  @Input() public slideNo: number;
  @Input() public isHidden: boolean;

  constructor() {}
}
