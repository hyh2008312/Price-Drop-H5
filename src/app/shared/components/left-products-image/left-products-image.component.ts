import { Input, Output, Component, OnInit, OnChanges} from '@angular/core';
import { ICarouselConfig, AnimationConfig } from '../angular4-carousel/index';

@Component({
  selector: 'app-left-products-image',
  templateUrl: './left-products-image.component.html',
  styleUrls: ['./_left-products-image.scss']
})

export class LeftProductsImageComponent implements OnInit {

  @Input() public images:any = [];

  public config: ICarouselConfig = {
    verifyBeforeLoad: true,
    log: false,
    animation: true,
    animationType: AnimationConfig.SLIDE,
    autoplay: false,
    autoplayDelay: 5000,
    stopAutoplayMinWidth: 0
  };

  public slideNumber: number = 0;

  constructor() {

  }

  ngOnInit():void {
  }

  slideChange(event) {
    this.slideNumber = event;
  }

}
