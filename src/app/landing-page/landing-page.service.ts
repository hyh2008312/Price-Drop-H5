import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { BaseApi } from '../config/app.api';

@Injectable()
export class LandingPageService {

  constructor(
    private http: Http,
    private baseUrl: BaseApi
  ) { }

  getProductList(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}product/customer/list/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      if(error.status == 401) {
        errMsg = 'Your email or password is incorrect. Please try again!';
      } else {
        const body = error.json() || '';
        const err = body.error || body;
        if(err.detail) {
          errMsg = `${err.detail}`;
        } else {
          if(err.error) {
            errMsg = "Sorry! Server is busy now!";
          }
        }
      }
    } else {
      errMsg = error.msg ? error.msg : error.toString();
    }
    return Promise.reject(errMsg);
  }

}
