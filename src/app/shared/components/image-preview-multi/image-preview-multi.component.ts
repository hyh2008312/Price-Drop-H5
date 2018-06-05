import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-image-preview-multi',
  templateUrl: './image-preview-multi.component.html',
  styleUrls: ['./_image-preview-multi.component.scss']
})
export class ImagePreviewMultiComponent {

  @Input() previewImg: any[] = [];

  constructor() {

  }

}
