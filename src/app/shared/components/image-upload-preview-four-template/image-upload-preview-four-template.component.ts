import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import { ImageUploadPreviewService } from "../image-upload-preview/image-upload-preview.service";
import { S3UploaderService } from "../../services/s3-upload/s3-upload.service";

import { HttpEventType, HttpResponse } from "@angular/common/http";

@Component({
  selector: 'app-image-upload-preview-four-template',
  templateUrl: './image-upload-preview-four-template.component.html',
  styleUrls: ['./_image-upload-preview-four-template.component.scss'],
  providers: [S3UploaderService]
})
export class ImageUploadPreviewFourTemplateComponent implements OnInit {

  @Input() previewImgFile: any;
  @Output() previewImgFileChange: EventEmitter<any[]> = new EventEmitter();

  @Input() previewImgSrc: any;


  @Input() type: string = 'COLLECTOR_BLOG_COVER';

  loading: number = 0;

  upload: boolean = false;

  closeLoading: boolean = true;

  closeAnimate: boolean = false;

  constructor(
    public previewImageService: ImageUploadPreviewService,
    public s3UploaderService: S3UploaderService
  ) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    if(this.previewImgSrc && this.previewImgSrc != '') {
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

      that.previewImgSrc = result;
      let file = event.target.files[0];

      let image = new Image();
      image.onload = function(){
        let width = image.width;
        let height = image.height;

        that.s3UploaderService.upload({
          type: that.type,
          fileName: file.name,
          use: 'cover',
          width: width,
          height: height
        }).then((data) => {
          let src = data.url + '/' + data.key;

          that.s3UploaderService.uploadToS3(file, data).subscribe((event) => {
            // Via this API, you get access to the raw event stream.
            // Look for upload progress events.
            if (event.type === HttpEventType.UploadProgress) {
              // This is an upload progress event. Compute and show the % done:
              that.loading = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              that.previewImgFile = src;
              that.previewImgFileChange.emit(that.previewImgFile);

            }
          });
        });
      };
      image.src = window.URL.createObjectURL(file);
      that.upload = true;
    })

  }

  remove(i) {
    this.previewImgSrc = false;
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
