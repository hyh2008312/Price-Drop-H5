import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Router} from '@angular/router';

import { BaseApi } from '../../config/app.api';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Injectable()
export class TrackingService {

  constructor( private http: Http, private baseUrl: BaseApi, private auth: AuthenticationService,
               public router: Router) { }

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

  pickCreate(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}purchase/pick/add/`;

    return this.http.post(url, product, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  pickEdit(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}purchase/pick/edit/${product.id}/`;

    return this.http.post(url, product, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  pickStatus(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}purchase/update/pick/status/${product.id}/`;

    return this.http.post(url, product, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  pickStatusChange(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}purchase/change/pick/status/${product.id}/`;

    return this.http.post(url, product, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getPickList(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}purchase/pick/list/?${this.serializeParams(params)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  pickDelete(params) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}purchase/delete/pick/${params.id}/`;

    return this.http.post(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  addNotes(params) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}purchase/pick/edit/notes/${params.id}/`;

    return this.http.post(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  getWarehouseList(): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}purchase/warehouse/list/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch((error) => {
        this.handleError(error, this)
      });
  }

  private handleError (error: Response | any, target?: any) {
    let errMsg: string;
    if (error instanceof Response) {
      if(error.status == 401) {
        if(target) {
          target.router.navigate(['/account/login/warehouse']);
        }
        return Promise.reject(401);
      }
      const body = error.json() || '';
      const err = body.error || body;
      if(err.detail) {
        errMsg = `${err.detail}`;
      } else {
        if(err.error) {
          errMsg = "Sorry! Server is busy now!";
        }
      }
    } else {
      errMsg = error.msg ? error.msg : error.toString();
    }
    return Promise.reject(errMsg);
  }

}
