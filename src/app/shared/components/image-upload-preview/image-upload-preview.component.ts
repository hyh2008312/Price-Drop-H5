import {Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges} from '@angular/core';
import { ImageUploadPreviewService } from "./image-upload-preview.service";
import { AngularCropperjsComponent } from 'angular-cropperjs';
import { S3UploaderService } from "../../services/s3-upload/s3-upload.service";

@Component({
  selector: 'app-image-upload-preview',
  templateUrl: './image-upload-preview.component.html',
  styleUrls: ['./image-upload-preview.component.css']
})
export class ImageUploadPreviewComponent implements OnInit {

  @Input() previewImgFile;
  @Output() previewImgFileChange: EventEmitter<string> = new EventEmitter();
  @Input() ratio = 1920 / 500;

  @ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;

  previewImgSrcs: Object;

  upload: boolean = false;
  croppedSrc: any = false;
  config: Object;


  file: any;

  public cropper : AngularCropperjsComponent;

  constructor(
    private previewImageService: ImageUploadPreviewService,
    private s3UploaderService : S3UploaderService
  ) {
    console.log("----->"+this.ratio);
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
    var blob =  this.convertBase64UrlToFile(this.croppedSrc, this.file);

    let that = this;
    let image = new Image();
    image.onload = function(){
      let width = image.width;
      let height = image.height;
      console.log(width + "|" + height)

      that.s3UploaderService.upload({
        type: 'COLLECTOR_STORE_TEMPLATE',
        fileName: blob.name,
        use: '',
        width: width,
        height: height
      }).then((data)=> {
        that.previewImgFile = data.url + '/' + data.key;
        that.s3UploaderService.uploadToS3WithoutLoading(blob, data).then((data) => {
          that.previewImgFileChange.emit(that.previewImgFile);
        });
      });
    };
    image.src = window.URL.createObjectURL(blob);
  }

  onEdit() {
    this.croppedSrc = false;
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
