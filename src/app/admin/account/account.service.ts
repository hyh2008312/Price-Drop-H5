import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Subject, BehaviorSubject} from 'rxjs';

import {BaseApi} from '../../config/app.api';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';

@Injectable()
export class AccountService {

  constructor(private http: Http, private baseUrl: BaseApi, private auth: AuthenticationService) {
  }

  createAuthorizationHeader(headers: Headers) {

    this.auth.getAccessToken().subscribe((data) => {
      if (data) {
        headers.append('Authorization', 'Bearer ' + data);
      }
    });

  }

  serializeParams(params) {

    let array = [];

    for (const key in params) {
      if (Array.isArray(params[key])) {
        if (params[key].length > 0) {
          let item = params[key].join(',');
          array.push(key + '=' + item);
        }
      } else {
        if (params[key] != undefined) {
          array.push(key + '=' + params[key]);
        }
      }
    }

    return array.join('&');
  }


  /*客服私信列表*/
  getMessageList(params: any) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});
    const url = `${this.baseUrl.url}order/supplier/message/list/?${this.serializeParams(params)}`;
    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  /*客服回复消息*/
  editSupplier(params: any) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});
    const url = `${this.baseUrl.url}supplier/update/`;
    return this.http.post(url, params, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  getSupplier() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});
    const url = `${this.baseUrl.url}supplier/detail/`;
    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || body;
      if (err.detail) {
        errMsg = `${err.detail}`;
      } else {
        if (err.error) {
          errMsg = "Sorry! Server is busy now!";
        }
      }
    } else {
      errMsg = error.msg ? error.msg : error.toString();
    }
    return Promise.reject(errMsg);
  }

}
