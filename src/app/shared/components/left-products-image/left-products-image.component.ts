import { Input, Output, Component, OnInit, OnChanges} from '@angular/core';
import { ICarouselConfig, AnimationConfig } from '../angular4-carousel/index';

@Component({
  selector: 'app-left-products-image',
  templateUrl: './left-products-image.component.html',
  styleUrls: ['./_left-products-image.scss']
})


export class LeftProductsImageComponent implements OnInit {

  @Input() public images:any = [];
  @Input() public selectedImage: any;
  @Input() public imageSources: string[] = [];
  @Input() insertImage: any = false;

  public config: ICarouselConfig = {
    verifyBeforeLoad: true,
    log: false,
    animation: true,
    animationType: AnimationConfig.SLIDE,
    autoplay: true,
    autoplayDelay: 5000,
    stopAutoplayMinWidth: 0
  };

  public slideNumber: number = 0;

  constructor() {

  }

  ngOnInit():void {
  }

  ngOnChanges() {
    if(this.insertImage) {
      this.selectedImage = this.insertImage;
      this.slideNumber = 0;
      this.config = {
        verifyBeforeLoad: true,
        log: false,
        animation: true,
        animationType: AnimationConfig.SLIDE,
        autoplay: true,
        autoplayDelay: 5000,
        stopAutoplayMinWidth: 0
      };
    }
    if(this.insertImage == null){
      this.selectedImage = this.imageSources[0];
    }
  }

  selectImage(image: any) {
    this.selectedImage = image;
  }

  slideChange(event) {
    this.slideNumber = event;
  }

}
