import {Component, EventEmitter, Input, OnInit, Output,OnChanges} from '@angular/core';
import { ImageUploadPreviewService } from "../../../shared/components/image-upload-preview/image-upload-preview.service";
import { S3UploaderService } from "../../../shared/services/s3-upload/s3-upload.service";

import { HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-product-image-upload-variant',
  templateUrl: './image-upload-variant.component.html',
  styleUrls: ['./_image-upload-variant.component.scss']
})
export class ImageUploadVariantComponent implements OnInit {

  @Input() previewImgFile: any = false;
  @Output() previewImgFileChange: EventEmitter<any[]> = new EventEmitter();

  @Input() previewImgSrcs: any = false;

  loading: any = 0;

  upload: any = false;

  closeLoading: any = true;

  closeAnimate: any = false;

  constructor(
    public previewImageService: ImageUploadPreviewService,
    public s3UploaderService: S3UploaderService
  ) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    if(this.previewImgFile != '') {
      this.upload = true;
    }
  }

  previewPic(event) {
    if(!event.target.files[0]) {
      return;
    }
    let that = this;
    that.loading = 0;
    that.closeLoading = false;
    that.closeAnimate = false;

    this.previewImageService.readAsDataUrl(event.target.files[0]).then(function(result) {

      that.previewImgSrcs = result;
      let file = event.target.files[0];

      let image = new Image();
      image.onload = function(){
        let width = image.width;
        let height = image.height;

        that.s3UploaderService.upload({
          type: 'product/main',
          fileName: file.name,
          use: 'cover',
          width: width,
          height: height
        }).then((data) => {
          let url = data.url;
          let key = data.name;

          that.s3UploaderService.uploadToS3(file, data).subscribe((event) => {
            // Via this API, you get access to the raw event stream.
            // Look for upload progress events.
            if (event.type === HttpEventType.UploadProgress) {
              // This is an upload progress event. Compute and show the % done:
              that.loading = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              that.previewImgFile = url + '/' + key;
              that.previewImgFileChange.emit(that.previewImgFile);
            }
          });
        });
      };
      image.src = window.URL.createObjectURL(file);

      that.upload = true;
    });

  }

  remove(i) {
    this.previewImgSrcs = false;
    this.previewImgFile = false;

    this.upload = false;
  }

  loadingChange(event) {
    if(event) {
      this.closeAnimate = true;
      this.closeLoading = true;
    }
  }


}
