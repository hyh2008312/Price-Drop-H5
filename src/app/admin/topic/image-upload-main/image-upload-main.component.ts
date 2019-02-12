import {Component, EventEmitter, Input, OnInit, Output,OnChanges} from '@angular/core';
import { ImageUploadPreviewService } from "../../../shared/components/image-upload-preview/image-upload-preview.service";
import { S3UploaderService } from "../../../shared/services/s3-upload/s3-upload.service";

import { HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-topic-image-upload-main',
  templateUrl: './image-upload-main.component.html',
  styleUrls: ['./_image-upload-main.component.scss']
})
export class ImageUploadMainComponent implements OnInit {

  @Input() previewImgFile;
  @Output() previewImgFileChange: EventEmitter<string> = new EventEmitter();
  @Input() previewImgSrcs: any = null;

  loading: number = 0;

  upload: boolean = false;

  closeLoading: boolean = true;

  closeAnimate: boolean = false;

  constructor(
    public previewImageService: ImageUploadPreviewService,
    private s3UploaderService: S3UploaderService
  ) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    if(this.previewImgSrcs) {
      this.upload = true;
    }
  }

  previewPic(event) {
    this.previewImgSrcs = {};
    this.previewImgFile = {};

    this.upload = false;

    if(!event.target.files[0]) {
      return;
    }
    let that = this;
    that.loading = 0;
    that.closeAnimate = false;
    that.closeLoading = false;

    this.previewImageService.readAsDataUrl(event.target.files[0]).then((result) => {

      that.previewImgSrcs = result;
      let file = event.target.files[0];

      let image = new Image();
      image.onload = function(){
        let width = image.width;
        let height = image.height;

        that.s3UploaderService.upload({
          type: 'banner',
          fileName: file.name,
          use: 'banner',
          width: width,
          height: height
        }).then((data) => {
          that.previewImgFile = data.url + '/' + data.name;
          let url = data.url;
          let key = data.name;

          that.s3UploaderService.uploadToS3(file, data).subscribe((event) => {
            // Via this API, you get access to the raw event stream.
            // Look for upload progress events.
            if (event.type === HttpEventType.UploadProgress) {
              // This is an upload progress event. Compute and show the % done:
              that.loading = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              that.closeAnimate = true;
              that.closeLoading = true;
              that.previewImgFile = url + '/' + key;
              that.previewImgFileChange.emit(that.previewImgFile);
            }
          });
        });
      };
      image.src = window.URL.createObjectURL(file);

      that.upload = true;
    })

  }


  loadingChange(event) {
    if(event) {

    }
  }


}
