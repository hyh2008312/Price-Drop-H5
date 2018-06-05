import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { ImageUploadPreviewService } from "./image-upload-preview.service";
import { AngularCropperjsComponent } from 'angular-cropperjs';
import { S3UploaderService } from "../../services/s3-upload/s3-upload.service";
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-image-upload-preview',
  templateUrl: './image-upload-preview.component.html',
  styleUrls: ['./_image-upload-preview.component.scss']
})
export class ImageUploadPreviewComponent implements OnInit {

  @Input() previewImgFile;
  @Output() previewImgFileChange: EventEmitter<string> = new EventEmitter();
  @Input() ratio = 1920 / 500;

  @ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;

  previewImgSrcs: any;

  upload: boolean = false;
  croppedSrc: any = false;
  config: any;
  loading: any = null;

  file: any;

  public cropper : AngularCropperjsComponent;

  constructor(
    private previewImageService: ImageUploadPreviewService,
    private s3UploaderService : S3UploaderService
  ) {
    this.config = {
      aspectRatio : this.ratio,
      scalable: true,
    }
  }

  ngOnChanges() {
    this.config = {
      aspectRatio : this.ratio,
      scalable: true,
    }
  }



  ngOnInit() {
  }

  previewPic(event) {
    if(!event.target.files[0]) {
      return;
    }
    let that = this;
    this.previewImageService.readAsDataUrl(event.target.files[0]).then(function(result) {

      that.previewImgSrcs = result;
      let file = event.target.files[0];
      that.file = file;

      that.upload = true;
    })

  }

  remove() {
    this.previewImgSrcs = {};
    this.previewImgFile = {};

    this.upload = false;
    this.croppedSrc = false;
  }

  onCropped() {
    const canvas = this.angularCropper.cropper.getCroppedCanvas();
    this.croppedSrc = canvas.toDataURL('image/jpeg', 1.0);
    this.previewImgFile = this.croppedSrc;
    let blob =  this.convertBase64UrlToFile(this.croppedSrc, this.file);

    let that = this;
    that.loading = 0;
    let image = new Image();
    image.onload = function(){
      let width = image.width;
      let height = image.height;

      that.s3UploaderService.upload({
        type: 'COLLECTOR_STORE_TEMPLATE',
        fileName: blob.name,
        use: '',
        width: width,
        height: height
      }).then((data)=> {
        that.previewImgFile = data.url + '/' + data.key;
        that.s3UploaderService.uploadToS3(blob, data).subscribe((event) => {
          // Via this API, you get access to the raw event stream.
          // Look for upload progress events.
          if (event.type === HttpEventType.UploadProgress) {
            // This is an upload progress event. Compute and show the % done:
            that.loading = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            that.previewImgFileChange.emit(that.previewImgFile);
            that.remove();
          }
        });
      });
    };
    image.src = window.URL.createObjectURL(blob);
  }

  convertBase64UrlToFile(dataURI, $file, domain?:any) {
    if($file == null) {
      $file = {};
      $file.name = domain + new Date().getTime();
    }
    let binary = atob(dataURI.split(',')[1]);
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    let array = [];
    for(let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    let file = new File([new Uint8Array(array)], $file.name, {type: mimeString});
    return file;
  };

}
