import { Injectable } from '@angular/core';

@Injectable()
export class ImageUploadPreviewService {

  constructor() { }

  getReader(resolve, reject) {
    let reader = new FileReader();
    reader.onload = this.onload(reader, resolve);
    reader.onerror = this.onError(reader, reject);
    return reader;
  }
  readAsDataUrl(file){
    let that = this;
    return new Promise(function(resolve,reject){
      let reader = that.getReader(resolve, reject);
      reader.readAsDataURL(file);
    })
  }

  onload(reader: FileReader, resolve) {
    return () => {
      resolve(reader.result);
    }
  }

  onError(reader: FileReader, reject) {
    return () => {
      reject(reader.result);
    }
  }
}
