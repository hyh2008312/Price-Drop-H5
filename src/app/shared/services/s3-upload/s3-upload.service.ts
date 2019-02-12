import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response} from "@angular/http";

import { HttpRequest,HttpClient,HttpHeaders } from "@angular/common/http";

import 'rxjs/add/operator/toPromise';

import { BaseApi } from '../../../config/app.api';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Observable } from "rxjs/Observable";


interface UploadFile {
  type: string;
  fileName: string;
  use: string;
  width: number;
  height: number;
}

@Injectable()
export class S3UploaderService {

  constructor(
    private http: Http,
    private httpClient: HttpClient,
    private baseUrl: BaseApi,
    private auth: AuthenticationService
  ) {
  }

  createAuthorizationHeader(headers: Headers) {

    this.auth.getAccessToken().subscribe((data) => {
      if(data) {
        headers.append('Authorization', 'Bearer ' + data);
      }
    });

  }

  serializeParams(params) {

    let array = [];

    for (const key in params) {
      if(Array.isArray(params[key])) {
        if(params[key].length > 0) {
          let item = params[key].join(',');
          array.push(key + '=' + item);
        }
      } else {
        if(params[key] != undefined) {
          array.push(key + '=' + params[key]);
        }
      }
    }

    return array.join('&');
  }

  serializeParamsJSONP(params) {

    let _params = new URLSearchParams();

    for (const key in params) {
      _params.set( key, params[key]);
    }
    _params.set('callback', "JSONP_CALLBACK");

    return _params;
  }

  private getPostOptions(): RequestOptions {

    let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({ headers: headers });

    return options;
  }

  upload(file: UploadFile): Promise<any> {

    let _options = this.getPostOptions();
    const url = `${this.baseUrl.url}image/qiniu/`;

    return this.http.post(url, file, _options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  uploadToS3(file: any, postParams: any): Observable<any> {

    let formData = new FormData();

    formData.append('token', postParams['token']);
    formData.append('key', postParams['name']);

    formData.append('file', file);


    const req = new HttpRequest('POST', postParams.domain, formData, {
      reportProgress: true
    });

    return this.httpClient.request(req);
  }

  uploadToS3WithoutLoading(file: any, postParams: any): Promise<any> {

    let formData = new FormData();

    formData.append('token', postParams['token']);
    formData.append('key', postParams['name']);

    formData.append('file', file);

    return this.http.post(postParams.domain, formData)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  formatImage(file: any): Promise<any> {

    let options = new RequestOptions();
    const url = `${this.baseUrl.formatUrl}image/upload/done/?${this.serializeParams(file)}`;

    return this.http.get(url, options)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.msg ? error.msg : error.toString();
    }
    return Promise.reject(errMsg);
  }
}
