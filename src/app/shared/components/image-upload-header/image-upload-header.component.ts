import {Component, EventEmitter, Input, OnInit, Output,OnChanges} from '@angular/core';
import { ImageUploadPreviewService } from "../image-upload-preview/image-upload-preview.service";
import { S3UploaderService } from "../../services/s3-upload/s3-upload.service";

import { HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-image-upload-header',
  templateUrl: './image-upload-header.component.html',
  styleUrls: ['./_image-upload-header.component.scss']
})
export class ImageUploadHeaderComponent implements OnInit {

  @Input() previewImgFile;
  @Output() previewImgFileChange: EventEmitter<string> = new EventEmitter();
  @Input() previewImgSrcs: any = null;
  @Input() larger : any = false;

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
          type: 'avatar',
          fileName: file.name,
          use: 'avatar',
          width: width,
          height: height
        }).then((data) => {
          that.previewImgFile = data.url + '/' + data.key;
          that.s3UploaderService.uploadToS3(file, data).subscribe((event) => {
            // Via this API, you get access to the raw event stream.
            // Look for upload progress events.
            if (event.type === HttpEventType.UploadProgress) {
              // This is an upload progress event. Compute and show the % done:
              that.loading = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
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
      this.closeAnimate = true;
      this.closeLoading = true;
    }
  }


}
