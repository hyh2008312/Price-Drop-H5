import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import { ImageUploadPreviewService } from "../image-upload-preview/image-upload-preview.service";
import { S3UploaderService } from "../../services/s3-upload/s3-upload.service";

import { HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-image-upload-preview-multi',
  templateUrl: './image-upload-preview-multi.component.html',
  styleUrls: ['./image-upload-preview-multi.component.css'],
  providers: [S3UploaderService]
})
export class ImageUploadPreviewMultiComponent implements OnInit {

  @Input() previewImgFile: any[] = [];
  @Output() previewImgFileChange: EventEmitter<any[]> = new EventEmitter();

  @Input() previewImgSrcs: any[] = [];

  loading: any = [0,0,0,0,0];

  upload: boolean = false;

  closeLoading: any = [true,true,true,true,true];

  closeAnimate: any = [false,false,false,false,false];

  constructor(
    public previewImageService: ImageUploadPreviewService,
    public s3UploaderService: S3UploaderService
  ) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    if(this.previewImgSrcs.length >= 5) {
      this.upload = true;
    }
  }

  previewPic(event) {
    if(!event.target.files[0]) {
      return;
    }
    let that = this;
    let length = that.previewImgSrcs.length;
    that.loading[length] = 0;
    that.closeLoading[length] = false;
    that.closeAnimate[length] = false;

    this.previewImageService.readAsDataUrl(event.target.files[0]).then(function(result) {

      that.previewImgSrcs.push(result);
      let file = event.target.files[0];

      let image = new Image();
      image.onload = function(){
        let width = image.width;
        let height = image.height;

        that.s3UploaderService.upload({
          type: 'COLLECTOR_PRODUCT_COVER',
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
              that.loading[length] = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              that.previewImgFile.push(src);
              that.previewImgFileChange.emit(that.previewImgFile);

            }
          });
        });
      };
      image.src = window.URL.createObjectURL(file);

      if( that.previewImgSrcs.length >= 5) {
        that.upload = true;
      }
    })

  }

  remove(i) {
    this.previewImgSrcs.splice(i,1);
    this.previewImgFile.splice(i,1);

    this.upload = false;
  }

  loadingChange(event, index) {
    if(event) {
      this.closeAnimate[index] = true;
      this.closeLoading[index] = true;
    }
  }

}
