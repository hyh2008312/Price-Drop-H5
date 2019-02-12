import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-image-upload-variant-preview',
  templateUrl: './image-upload-variant-preview.component.html',
  styleUrls: ['./_image-upload-variant-preview.component.scss']
})
export class ImageUploadVariantPreviewComponent implements OnInit {


  @Input() previewImgSrcs: any = false;

  constructor() {

  }

  ngOnInit() {

  }

}
